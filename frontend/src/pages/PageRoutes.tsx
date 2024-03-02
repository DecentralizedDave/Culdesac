import { Route, Routes } from "react-router-dom";
import { useScrollToTop } from "../shared/Hooks/scrollToTop";

// routes
import { ROUTES } from "./routes";

// pages
import { HomePage } from "./HomePage";
import { CommunityProfile } from "./CommunityProfile";
import MyProfile from "./MyProfile";
import UserProfile from "./UserProfile";

export function PageRoutes() {
    useScrollToTop();
    return (
        <>
        <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.community} element={<CommunityProfile />} />
            <Route path={ROUTES.myProfile} element={<MyProfile />} />
            <Route path={ROUTES.userProfile} element={<UserProfile />} />
            <Route path='/*' element={<HomePage />} />
        </Routes>
        </>
    )
}