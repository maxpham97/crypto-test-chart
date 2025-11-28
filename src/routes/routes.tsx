import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTERS_PATHS } from "../constants/router-paths";
import Layout from "../layout/Layout";

const TradePage = lazy(() => import("../pages/trade"));

interface IRoutesState {
    path: string;
    component: React.ComponentType;
}

export const renderRoutes = () => {
    return (
        <Suspense fallback={"loading..."}>
            <Routes>
                {routes.map((route: IRoutesState, index: number) => {
                    const Component = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Component />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Suspense>
    );
};

const routes: IRoutesState[] = [{ component: TradePage, path: ROUTERS_PATHS.TRADE }];
