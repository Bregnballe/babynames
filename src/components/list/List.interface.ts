export interface ListProps {
    as?: any;
    children: React.ReactNode;
    color: "primary" | "secondary" | "tertiary" | "quaternary";
    direction?: "horizontal" | "vertical";
    fluid?: boolean;
    maxWidth?: "small" | "medium" | "large";
    padding?: "small" | "medium" | "large" | "none";
}