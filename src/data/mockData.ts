import heroDinner from '../assets/hero-dinner.jpg';
import whiteSuit from '../assets/white-suit.jpg';
import fabrics from '../assets/fabrics-texture.jpg';
import silverFuture from '../assets/silver-futuristic.jpg';
import shoeEditorial from '../assets/shoe-editorial.jpg';
import resortElegance from '../assets/resort-elegance.jpg';

export interface Product {
    id: string;
    brand: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
}

export interface Outfit {
    id: string;
    title: string;
    description: string;
    totalPrice: number;
    savings?: number;
    aiRationale: string;
    tags: string[];
    products: Product[];
    heroImage: string; // The main look image
}

export interface FeedSection {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    type: 'outfits' | 'tip';
    content: Outfit[] | string; // detailed string for tip
}

export const MOCK_FEED: FeedSection[] = [
    {
        id: 'tip-daily',
        title: 'Daily Style Insight',
        subtitle: 'Curated for you',
        icon: 'Sparkles',
        type: 'tip',
        content: "Layer rich fabrics like silk and velvet for regal presence. Gold accents elevate your look instantly."
    },
    {
        id: 'sec-wedding',
        title: 'Wedding Looks',
        subtitle: 'Elegant ensembles for your most special moments',
        icon: 'Heart',
        type: 'outfits',
        content: [
            {
                id: 'outfit-1',
                title: 'Royal Wedding Elegance',
                description: 'A timeless silhouette combining modern draping with traditional craftsmanship.',
                totalPrice: 28500,
                savings: 4200,
                aiRationale: 'This deep burgundy shade complements your warm skin tone perfectly, while the A-line silhouette balances your proportions.',
                tags: ['Traditional', 'Heavy Work'],
                heroImage: heroDinner,
                products: [
                    {
                        id: 'p1', brand: 'Tarun Tahiliani', name: 'Burgundy Embroidered Lehenga', price: 22000, originalPrice: 25000,
                        image: fabrics,
                        category: 'Apparel', rating: 4.8
                    },
                    {
                        id: 'p2', brand: 'Amrapali', name: 'Kundan choker set', price: 6500,
                        image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=800',
                        category: 'Jewelry', rating: 4.9
                    }
                ]
            }
        ]
    },
    {
        id: 'sec-office',
        title: 'Office Professional',
        subtitle: 'Power dressing for your career',
        icon: 'Briefcase',
        type: 'outfits',
        content: [
            {
                id: 'outfit-2',
                title: 'Modern CEO Chic',
                description: 'Sharp tailoring meets comfort for all-day confidence.',
                totalPrice: 12500,
                savings: 0,
                aiRationale: 'The structured blazer adds definition to your shoulders, creating a powerful silhouette suitable for boardrooms.',
                tags: ['Formal', 'Power Dressing'],
                heroImage: whiteSuit,
                products: [
                    {
                        id: 'p3', brand: 'Zara', name: 'Structured Blazer', price: 5500,
                        image: whiteSuit,
                        category: 'Apparel', rating: 4.5
                    },
                    {
                        id: 'p4', brand: 'H&M', name: 'Pleated Trousers', price: 2999,
                        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
                        category: 'Apparel', rating: 4.3
                    },
                    {
                        id: 'p5', brand: 'Aldo', name: 'Classic Pumps', price: 4000,
                        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
                        category: 'Footwear', rating: 4.6
                    }
                ]
            }
        ]
    },
    {
        id: 'sec-party',
        title: 'Evening & Avant-Garde',
        subtitle: 'Make a statement after dark',
        icon: 'Crown',
        type: 'outfits',
        content: [
            {
                id: 'outfit-3',
                title: 'Future Minimalist',
                description: 'High-shine metallics paired with structural simplicity.',
                totalPrice: 45000,
                savings: 0,
                aiRationale: 'The silver tones illuminate your cool undertones, while the sharp collar draws focus to your face.',
                tags: ['Party', 'Statement'],
                heroImage: silverFuture,
                products: [
                    {
                        id: 'p6', brand: 'Metallic', name: 'Silver Silk Shirt', price: 12000,
                        image: silverFuture,
                        category: 'Apparel', rating: 4.7
                    },
                    {
                        id: 'p7', brand: 'Designer', name: 'Suede Ankle Boots', price: 8500,
                        image: shoeEditorial,
                        category: 'Footwear', rating: 4.9
                    }
                ]
            }
        ]
    },
    {
        id: 'sec-resort',
        title: 'Resort & Travel',
        subtitle: 'Effortless luxury for your next getaway',
        icon: 'Sun',
        type: 'outfits',
        content: [
            {
                id: 'outfit-4',
                title: 'Ethereal Silk Lounge',
                description: 'Fluid drapes in soft pastels for ultimate relaxation.',
                totalPrice: 18000,
                savings: 0,
                aiRationale: 'The soft pink hue complements your complexion, while the loose fit ensures comfort without sacrificing style.',
                tags: ['Resort', 'Silk'],
                heroImage: resortElegance,
                products: [
                    {
                        id: 'p8', brand: 'Silk Maison', name: 'Silk Kimono Set', price: 15000,
                        image: resortElegance,
                        category: 'Apparel', rating: 4.9
                    },
                    {
                        id: 'p9', brand: 'Local Aura', name: 'Gemstone Drop Earrings', price: 3000,
                        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
                        category: 'Jewelry', rating: 4.6
                    }
                ]
            }
        ]
    }
];
