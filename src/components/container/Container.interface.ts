export interface ContainerProps {
    children: React.ReactNode;
    padding?: 'small' | 'medium' | 'large' | 'none';
    layout?: 'row' | 'column';
    fluid?: boolean;
    as?: any;
} 