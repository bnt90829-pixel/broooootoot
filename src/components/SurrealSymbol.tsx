import {
  Moon,
  DoorOpen,
  Clock,
  Compass,
  Sparkles,
  CloudRain,
  Feather,
  Eye,
  Key,
  Quote,
  Heart,
  Wind,
  Flame,
  Wine,
  Snowflake,
  Sun,
  Crown,
  Zap,
  Gem,
  Mountain,
  Music,
  Trees,
} from 'lucide-react';

interface SurrealSymbolProps {
  symbol: string;
  className?: string;
  size?: number;
}

export function SurrealSymbol({ symbol, className = 'text-[#c5a880]', size = 28 }: SurrealSymbolProps) {
  switch (symbol) {
    case 'moon':
      return <Moon size={size} className={className} strokeWidth={1.5} />;
    case 'door':
      return <DoorOpen size={size} className={className} strokeWidth={1.5} />;
    case 'clock':
      return <Clock size={size} className={className} strokeWidth={1.5} />;
    case 'mirror':
      return <Eye size={size} className={className} strokeWidth={1.5} />;
    case 'rose':
    case 'heart':
      return <Heart size={size} className={className} strokeWidth={1.5} />;
    case 'fog':
    case 'wind':
      return <Wind size={size} className={className} strokeWidth={1.5} />;
    case 'feather':
    case 'pen':
      return <Feather size={size} className={className} strokeWidth={1.5} />;
    case 'stars':
    case 'sparkles':
    case 'sparkle':
    case 'galaxy':
    case 'star':
      return <Sparkles size={size} className={className} strokeWidth={1.5} />;
    case 'window':
      return <Key size={size} className={className} strokeWidth={1.5} />;
    case 'shadow':
    case 'rain':
      return <CloudRain size={size} className={className} strokeWidth={1.5} />;
    case 'wine':
      return <Wine size={size} className={className} strokeWidth={1.5} />;
    case 'flame':
    case 'volcano':
      return <Flame size={size} className={className} strokeWidth={1.5} />;
    case 'snow':
      return <Snowflake size={size} className={className} strokeWidth={1.5} />;
    case 'sun':
      return <Sun size={size} className={className} strokeWidth={1.5} />;
    case 'crown':
      return <Crown size={size} className={className} strokeWidth={1.5} />;
    case 'lightning':
      return <Zap size={size} className={className} strokeWidth={1.5} />;
    case 'gem':
      return <Gem size={size} className={className} strokeWidth={1.5} />;
    case 'mountain':
      return <Mountain size={size} className={className} strokeWidth={1.5} />;
    case 'music':
      return <Music size={size} className={className} strokeWidth={1.5} />;
    case 'tree':
      return <Trees size={size} className={className} strokeWidth={1.5} />;
    case 'compass':
      return <Compass size={size} className={className} strokeWidth={1.5} />;
    default:
      return <Quote size={size} className={className} strokeWidth={1.5} />;
  }
}

