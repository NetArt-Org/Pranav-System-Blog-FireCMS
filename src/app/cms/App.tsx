"use client";;
import { useCallback } from "react";

import "@/app/common/index.css"
import "typeface-rubik";
import "@fontsource/jetbrains-mono";

import {
    AppBar,
    CircularProgressCenter,
    Drawer,
    FireCMS,
    ModeControllerProvider,
    NavigationRoutes,
    Scaffold,
    SideDialogs,
    SnackbarProvider,
    useBuildLocalConfigurationPersistence,
    useBuildModeController,
    useBuildNavigationController,
    useValidateAuthenticator,
} from "@firecms/core";
import {
    FirebaseAuthController,
    FirebaseSignInProvider,
    useFirebaseAuthController,
    useFirebaseStorageSource,
    useFirestoreDelegate,
    useInitialiseFirebase
} from "@firecms/firebase";

import { firebaseConfig } from "../common/firebase_config";
import { useBuildUserManagement, userManagementAdminViews, useUserManagementPlugin } from "@firecms/user_management";
import { useImportPlugin } from "@firecms/data_import";
import { useExportPlugin } from "@firecms/data_export";
import logo from "@/app/common/logo.svg";
import { blogCollection } from "@/app/cms/collections/blog";
import { CustomLoginView } from "@/app/cms/components/CustomLoginView";
import { Button, OpenInNewIcon } from "@firecms/ui";
import Link from "next/link";

export function App() {

    const title = "Pranav System Blog Content";

    if (!firebaseConfig?.projectId) {
        throw new Error("Firebase config not found. Please check your `firebase_config.ts` file and make sure it is correctly set up.");
    }

    const {
        firebaseApp,
        firebaseConfigLoading,
        configError
    } = useInitialiseFirebase({
        firebaseConfig,
        name: "FireCMS",
    });

    const collectionsBuilder = useCallback(() => {
        return [
            blogCollection,
            // homeCollection
        ];
    }, []);


    const signInOptions: FirebaseSignInProvider[] = ["google.com", "password"];

    /**
     * Controller used to manage the dark or light color mode
     */
    const modeController = useBuildModeController();

    /**
     * Delegate used for fetching and saving data in Firestore
     */
    const firestoreDelegate = useFirestoreDelegate({
        firebaseApp,
        localTextSearchEnabled: true
    })

    /**
     * Controller used for saving and fetching files in storage
     */
    const storageSource = useFirebaseStorageSource({
        firebaseApp
    });

    /**
     * Controller for managing authentication
     */
    const authController: FirebaseAuthController = useFirebaseAuthController({
        firebaseApp,
        signInOptions
    });
    /**
     * Controller in charge of user management
     */
    const userManagement = useBuildUserManagement({
        dataSourceDelegate: firestoreDelegate,
        authController
    });

    /**
     * Controller for saving some user preferences locally.
     */
    const userConfigPersistence = useBuildLocalConfigurationPersistence();

    /**
     * Use the authenticator to control access to the main view
     */
    const {
        authLoading,
        canAccessMainView,
        notAllowedError
    } = useValidateAuthenticator({
        authController: userManagement,
        disabled: userManagement.loading,
        authenticator: () => true, // you can define your own authenticator here
        // authenticator: userManagement.authenticator, // you can define your own authenticator here
        dataSourceDelegate: firestoreDelegate,
        storageSource
    });

    const navigationController = useBuildNavigationController({
        collections: collectionsBuilder,
        // collectionPermissions: userManagement.collectionPermissions, // TODO: enable this
        adminViews: userManagementAdminViews,
        authController,
        dataSourceDelegate: firestoreDelegate
    });

    /**
     * Data enhancement plugin
     */

    /**
     * User management plugin
     */
    const userManagementPlugin = useUserManagementPlugin({ userManagement });

    /**
     * Allow import and export data plugin
     */
    const importPlugin = useImportPlugin();
    const exportPlugin = useExportPlugin();

    if (firebaseConfigLoading || !firebaseApp) {
        return <CircularProgressCenter/>;
    }

    if (configError) {
        return <>{configError}</>;
    }

    return (
        <SnackbarProvider>
            <ModeControllerProvider value={modeController}>

                <FireCMS
                    navigationController={navigationController}
                    authController={userManagement}
                    userConfigPersistence={userConfigPersistence}
                    dataSourceDelegate={firestoreDelegate}
                    storageSource={storageSource}
                    plugins={[
                        importPlugin,
                        exportPlugin,
                        userManagementPlugin
                    ]}
                >
                    {({
                          context,
                          loading
                      }) => {

                        let component;
                        if (loading || authLoading) {
                            component = <CircularProgressCenter size={"large"}/>;
                        } else {
                            if (!canAccessMainView) {
                                component = (
                                    <div
                                        className={"bg-white dark:bg-surface-900 rounded-2xl max-w-[500px] w-full h-fit"}>
                                        <CustomLoginView
                                            logo={logo.src}
                                            allowSkipLogin={false}
                                            signInOptions={signInOptions}
                                            firebaseApp={firebaseApp}
                                            authController={userManagement}
                                            notAllowedError={notAllowedError}/>
                                    </div>

                                );
                            } else {
                                component = (
                                    <Scaffold
                                        logo={logo.src}
                                        autoOpenDrawer={false}>
                                        <AppBar title={title}
                                               
                                        />
                                        <Drawer/>
                                        <NavigationRoutes/>
                                        <SideDialogs/>
                                    </Scaffold>
                                );
                            }
                        }

                        return component;
                    }}
                </FireCMS>
            </ModeControllerProvider>
        </SnackbarProvider>
    );
}
