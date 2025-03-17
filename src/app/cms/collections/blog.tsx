import { buildCollection } from "@firecms/core";
import { BlogEntry } from "@/app/common/types";


export const blogCollection = buildCollection<BlogEntry>({
    id: "blog",
    path: "blog",
    name: "Blog",
    singularName: "Blog entry",
    icon: "article",
    group: "Content",
    description: "A collection of blog entries",
    defaultSize: "l",
    properties: {
        name: {
            name: "Name",
            validation: { required: true },
            dataType: "string"
        },
        header_image:{
            name: "Header image",
            validation: { required: true },
            dataType: "string"
        },
        // header_image: {
        //     name: "Header image",
        //     dataType: "string",
        //     storage: {
        //         storagePath: "images",
        //         acceptedFiles: ["image/*"],
        //         metadata: {
        //             cacheControl: "max-age=1000000"
        //         }
        //     }
        // },
        content: {
            name: "Content",
            description: "Content blocks for the blog entry",
            validation: { required: true },
            dataType: "array",
            oneOf: {
                typeField: "type",
                valueField: "value",
                properties: {
                    text: {
                        dataType: "string",
                        name: "Text",
                        markdown: true
                    },
                    quote: {
                        dataType: "string",
                        name: "Quote",
                        multiline: true
                    },
                    images: {
                        name: "Images",
                        dataType: "array",
                        of: {
                            dataType: "string",
                            storage: {
                                storagePath: "images",
                                acceptedFiles: ["image/*"],
                                metadata: {
                                    cacheControl: "max-age=1000000"
                                }
                            }
                        },
                        description: "This fields allows uploading multiple images at once and reordering"
                    },
                },
                propertiesOrder: ["text", "quote", "images",]
            }
        },
        created_on: {
            name: "Created on",
            dataType: "date",
            autoValue: "on_create"
        },
        status: {
            name: "Status",
            validation: { required: true },
            dataType: "string",
            enumValues: {
                published: {
                    id: "published",
                    label: "Published",
                },
                draft: "Draft"
            },
            defaultValue: "draft"
        },
        publish_date: {
            name: "Publish date",
            dataType: "date",
            clearable: true
        },
        reviewed: {
            name: "Reviewed",
            dataType: "boolean"
        },
        tags: {
            name: "Tags",
            description: "Example of generic array",
            dataType: "array",
            of: {
                dataType: "string",
                previewAsTag: true
            }
        }
    },
    initialFilter: {
        status: ["==", "published"]
    }
});
