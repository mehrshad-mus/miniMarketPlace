import { ProductGetPayload, ProductRequestGetPayload } from "@/app/generated/prisma/models"
import { JSX, JSXElementConstructor } from "react"

export type productWithBrandAndCategory = ProductGetPayload<{
    include: {
        brand: true,
        category: true,
        productImage: true,
        productOption: {
            include: {
                productOptionValues: true,
            }
        },
        productVariant: {
            include: {
                offer: {
                    include: {
                        seller: true
                    }
                },
                variantValue: {
                    include: {
                        productOptionValue: {
                            include: {
                                productOption: true
                            }
                        }
                    }
                }
            }
        }

    }
}>


export type productRequestType = ProductRequestGetPayload<{
    include: {
        brand: true,
        category: true,
        images: true,
        seller: true
    }
}>


export type SidebarItems = {
    name: string;
    nameFn?: () => JSX.Element;
    permission: string[];
    type: string;
    url: string;
    icon?: (isPathNameIncludeURL?: boolean) => JSX.Element;
    sidebarSubItems?: SidebarSubItem[]
};

export type SidebarSubItem = {
    name: string;
    nameFn?: () => JSX.Element;
    permission: string[];
    url: string;
};