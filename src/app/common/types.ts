import { EntityReference } from "@firecms/core";


export type BlogEntry = {
    name: string,
    header_image: string,
    content: (BlogEntryImages | BlogEntryText  | BlogQuote)[];
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
