import { Home, Info, Settings, Lock } from "@mui/icons-material";
import { UserProfile } from "../../routes/userProfile";

interface IMenuItem {
    text: string;
    icon: JSX.Element;
    profiles: UserProfile[];
}

const menuItems: IMenuItem[] = [
    { text: 'Home', icon: <Home />, profiles: ['Admin', 'Editor', 'Viewer'] },
    { text: 'About', icon: <Info />, profiles: ['Admin', 'Editor'] },
    { text: 'Settings', icon: <Settings />, profiles: ['Admin'] },
    { text: 'Restricted', icon: <Lock />, profiles: ['Admin'] },
];

export default menuItems;
