import { EntityReference } from "@firecms/core";

export type HomeEntry = {
    banner:{
        heading:string,
        content: string;
        btnTxt: string;
        btnLink: string;
        imageUrl:string;
        coinUrl:string;
        stockUrl:string;
        graphUrl:string;
    },
    keyStats: {
        content: string;
        imageUrl: string;
    }[];
    explore: {
        heading: string;
        content: string;
        carousel: {
            heading: string;
            content: string;
            imageUrl: string;
        }[];
    };
    trading: {
        heading: string;
        content: string;
        carousel: {
            heading: string;
            content: string;
            imageUrl: string;
            btnTxt: string;
            link: string;
        }[];
    };
    trade: {
        heading: string;
        content: string;
        list: {
            btnTxt: string;
        }[];
        imageUrl: string;
        Googlelink: string;
        AppStoreLink: string;
    };
    features: {
        heading: string;
        content: string;
        features: {
            heading: string;
            content: string;
        }[];
    };
}
export type AccountEntry = {
    banner:{
        heading:string,
        content: string,
        btnTxt: string,
        btnLink: string,
        imageUrl:string,
    },
    info: {
        heading: string,
        content: string,
    },
    account: {
        heading: string,
        content: string,
        accountName: string,
        tableData: {
            [key: string]: {
                heading: string,
                content: string,
            },
        },
        note: string,
    },
    steps: {
        heading: string,
        content: string,
        steps: {
            heading: string,
            content: string,
            imageUrl: string,
            btnTxt: string,
            link: string,
        }[],
    },
    beginTrading:{
        heading:string,
        content: string,
        btnTxt: string,
        btnLink: string,
        imageUrl:string,
    },
}
export type BlogEntry = {
    slug: string,
    name: string,
    header_image: string,
    content: string;
    created_on: Date,
    publish_date: Date,
    reviewed: boolean,
    status: string,
    tags: string[]
}

export type BlogEntryWithId = BlogEntry & { id: string };

export type BlogEntryImages = {
    type: "images";
    value: string[];
}

export type BlogEntryText = {
    type: "text";
    value: string;
}

export type BlogQuote = {
    type: "quote";
    value: string;
}
