import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface FavoriteProduct {
    id: string;
    name: string;
    brand?: string;
    category?: string;
    imageUrl?: string;
    store?: string;
    storeUrl?: string;
    price: number;
    discountedPrice?: number;
}

/** Persists a product's favorited/saved state to the saved_items table,
 * scoped to the current user. Optimistic toggle with rollback on failure
 * so the heart never shows a state the backend didn't actually confirm. */
export function useFavorite(product: FavoriteProduct) {
    const { user } = useAuth();
    const [isFavorited, setIsFavorited] = useState(false);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;
        if (!user) {
            setReady(true);
            return;
        }
        supabase
            .from('saved_items')
            .select('id')
            .eq('user_id', user.id)
            .eq('product_id', product.id)
            .maybeSingle()
            .then(({ data }) => {
                if (!active) return;
                setIsFavorited(!!data);
                setReady(true);
            });
        return () => {
            active = false;
        };
    }, [user, product.id]);

    const toggle = useCallback(async () => {
        if (!user || loading) return;
        setLoading(true);
        const wasFavorited = isFavorited;
        setIsFavorited(!wasFavorited);

        try {
            if (wasFavorited) {
                const { error } = await supabase
                    .from('saved_items')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('product_id', product.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('saved_items').insert({
                    user_id: user.id,
                    product_id: product.id,
                    product_name: product.name,
                    product_brand: product.brand ?? null,
                    category: product.category ?? null,
                    image_url: product.imageUrl ?? null,
                    store: product.store ?? null,
                    store_url: product.storeUrl ?? null,
                    product_price: product.price,
                    product_discounted_price: product.discountedPrice ?? null,
                });
                if (error) throw error;
            }
        } catch (err) {
            setIsFavorited(wasFavorited);
            console.error('Failed to update saved item:', err);
            toast.error('Could not update your closet. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [user, loading, isFavorited, product]);

    return { isFavorited, toggle, loading, ready };
}
