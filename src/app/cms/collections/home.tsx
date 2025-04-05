import { buildCollection } from "@firecms/core";
import { HomeEntry } from "@/app/common/types";

export const homeCollection = buildCollection<HomeEntry>({
    id: "home",
    path: "home",
    name: "Home",
    singularName: "Home entry",
    icon: "article",
    group: "Content",
    description: "Home Page Content",
    defaultSize: "l",
    properties: {
        banner: {
            name: "Banner",
            dataType: "map",
            properties: {
                heading: {
                    name: "Heading",
                    dataType: "string",
                    markdown: true,
                },
                content: {
                    name: "Content",
                    dataType: "string",
                    multiline: true,
                },
                btnTxt: {
                    name: "Button Text",
                    dataType: "string",
                },
                btnLink: {
                    name: "Button Link",
                    dataType: "string",
                    url: true
                }
            },
            expanded: true
        },
        keyStats: {
            dataType: "array",
            name: "KeyStats",
            of: {
                dataType: "map",
                properties: {
                    content: {
                        name: "Content",
                        dataType: "string"
                    },
                    imageUrl: {
                        name: "Icon URL",
                        dataType: "string",
                        url: true
                    }
                }
            },
            expanded: true,
        },
        explore: {
            name: "Explore Section",
            dataType: "map",
            properties: {
                heading: {
                    name: "Heading",
                    dataType: "string",
                },
                content: {
                    name: "Content",
                    dataType: "string",
                },
                carousel: {
                    dataType: "array",
                    name: "Carousel",
                    of: {
                        dataType: "map",
                        properties: {
                            heading: {
                                name: "Heading",
                                dataType: "string",
                            },
                            content: {
                                name: "Content",
                                dataType: "string",
                            },
                            imageUrl: {
                                name: "Image URL",
                                dataType: "string",
                                url: true
                            }
                        }
                    },
                    expanded: true,
                },
            },
            expanded: true
        },
        trading: {
            name: "Discover Trading Section",
            dataType: "map",
            properties: {
                heading: {
                    name: "Heading",
                    dataType: "string",
                },
                content: {
                    name: "Content",
                    dataType: "string",
                },
                carousel: {
                    dataType: "array",
                    name: "Carousel",
                    of: {
                        dataType: "map",
                        properties: {
                            heading: {
                                name: "Heading",
                                dataType: "string",
                            },
                            content: {
                                name: "Content",
                                dataType: "string",
                            },
                            imageUrl: {
                                name: "Image URL",
                                dataType: "string",
                                url: true
                            },
                            btnTxt: {
                                name: "Button Text",
                                dataType: "string",
                            },
                            link: {
                                name: "Link",
                                dataType: "string",
                                url: true
                            }
                        }
                    },
                    expanded: true,
                },
            },
            expanded: true
        },
        trade: {
            name: "Trade Section",
            dataType: "map",
            properties: {
                heading: {
                    name: "Heading",
                    dataType: "string",
                },
                content: {
                    name: "Content",
                    dataType: "string",
                },
                list: {
                    dataType: "array",
                    name: "List",
                    of: {
                        dataType: "map",
                        properties: {
                            btnTxt: {
                                name: "Button Text",
                                dataType: "string",
                            },
                        }
                    },
                    expanded: true,
                },
                imageUrl: {
                    name: "Image URL",
                    dataType: "string",
                    url: true
                },
                Googlelink: {
                    name: "Google App Link",
                    dataType: "string",
                    url: true
                },
                AppStoreLink: {
                    name: "App Store Link",
                    dataType: "string",
                    url: true
                }
            },
            expanded: true
        },
        features: {
            name: "Discover Features Section",
            dataType: "map",
            properties: {
                heading: {
                    name: "Heading",
                    dataType: "string",
                },
                content: {
                    name: "Content",
                    dataType: "string",
                },
                features: {
                    dataType: "array",
                    name: "Features",
                    of: {
                        dataType: "map",
                        properties: {
                            heading: {
                                name: "Heading",
                                dataType: "string",
                            },
                            content: {
                                name: "Content",
                                dataType: "string",
                            },
                        }
                    },
                    expanded: true,
                },
            },
            expanded: true
        },
    },
});
