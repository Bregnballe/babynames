import React from "react";

export interface InputProps extends React.HTMLProps<HTMLInputElement>  {
    componentSize?: 'small' | 'medium' | 'large'; //cannot be named size as property already exists in html props on input fields
    fluid?: boolean;
    hasLabel?: boolean;
    id?: string;
    textAlign?: 'left' | 'center' | 'right';
    textPlaceholder?: string; // same goes for placeholder
    handleChange?: (val:string) => void;
}    