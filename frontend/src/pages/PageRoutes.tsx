import { Route, Routes } from "react-router-dom";

// routes
import { ROUTES } from "./routes";

// pages
import { HomePage } from "./HomePage";
import { CommunityProfile } from "./CommunityProfile";
import { UserProfile } from "./UserProfile";

export function PageRoutes() {
    return (
        <>
        <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.community} element={<CommunityProfile />} />
            <Route path={ROUTES.profile} element={<UserProfile />} />
            <Route path='/*' element={<HomePage />} />
        </Routes>
        </>
    )
}