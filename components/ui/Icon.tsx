
import React from 'react';
import type { LucideProps } from 'lucide-react';
import {
  Brain, Lightbulb, Zap, Settings, Users, Briefcase, Target, Code, Database,
  Cloud, Shield, CheckCircle, XCircle, AlertTriangle, Info, MessageSquare,
  FileText, Calendar, Clock, MapPin, DollarSign, BarChart2, GitBranch,
  Star, Heart, ThumbsUp, Award, Rocket, Anchor, BookOpen, Coffee, Cpu,
  Disc, Feather, Flag, Gift, HardDrive, Home, Image, Link, Mic, Monitor,
  MousePointer, Package, PenTool, Printer, Save, Scissors, Server, Share2,
  Slack, Smartphone, Speaker, Tablet, Terminal, Trash2, Truck, Upload,
  Video, Wifi, Wind, Youtube, Circle, ArrowRight, CornerDownRight, Workflow
} from 'lucide-react';

const iconMap = {
  brain: Brain, lightbulb: Lightbulb, zap: Zap, settings: Settings, users: Users,
  briefcase: Briefcase, target: Target, code: Code, database: Database, cloud: Cloud,
  shield: Shield, 'check-circle': CheckCircle, 'x-circle': XCircle,
  'alert-triangle': AlertTriangle, info: Info, 'message-square': MessageSquare,
  'file-text': FileText, calendar: Calendar, clock: Clock, 'map-pin': MapPin,
  'dollar-sign': DollarSign, 'bar-chart-2': BarChart2, 'git-branch': GitBranch,
  star: Star, heart: Heart, 'thumbs-up': ThumbsUp, award: Award, rocket: Rocket,
  anchor: Anchor, 'book-open': BookOpen, coffee: Coffee, cpu: Cpu, disc: Disc,
  feather: Feather, flag: Flag, gift: Gift, 'hard-drive': HardDrive, home: Home,
  image: Image, link: Link, mic: Mic, monitor: Monitor, 'mouse-pointer': MousePointer,
  package: Package, 'pen-tool': PenTool, printer: Printer, save: Save, scissors: Scissors,
  server: Server, 'share-2': Share2, slack: Slack, smartphone: Smartphone, speaker: Speaker,
  tablet: Tablet, terminal: Terminal, 'trash-2': Trash2, truck: Truck, upload: Upload,
  video: Video, wifi: Wifi, wind: Wind, youtube: Youtube, 'arrow-right': ArrowRight,
  'corner-down-right': CornerDownRight, workflow: Workflow,
  default: Circle,
};

interface IconProps extends LucideProps {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const normalizedName = name?.toLowerCase().replace(/\s/g, '-') || 'default';
  const LucideIcon = iconMap[normalizedName as keyof typeof iconMap] || iconMap.default;
  return <LucideIcon {...props} />;
};
