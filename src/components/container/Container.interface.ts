export interface ContainerProps {
    as?: any;
    children: React.ReactNode;
    componentSize?: 'small' | 'medium' | 'large';
    fixed?: "top" | "right" | "bottom" | "left";
    fluid?: boolean;
    layout?: "row" | "column";
    maxWidth?: "small" | "medium" | "large";
    padding?: "small" | "medium" | "large" | "none";
    ref?: any;
}
