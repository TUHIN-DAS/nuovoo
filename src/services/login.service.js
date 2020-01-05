import { Subject} from "rxjs";
import { User } from "models/user.model";

const $loginModal = new Subject();
const $registerModal = new Subject();
const $authUser = new Subject();
const $forgotPasswordModal = new Subject();
const $userProfileModal = new Subject();

export const LoginService = {
    openLoginModal : () => $loginModal.next(true),
    closeLoginModal : () => $loginModal.next(false),
    showLoginModal : () => $loginModal,
    openRegisterModal : () => $registerModal.next(true),
    closeRegisterModal : () => $registerModal.next(false),
    showRegisterModal : () => $registerModal,
    setAuthUser : (data) => {
        let user = new User(data);
        console.log(user);
        $authUser.next(user);
    },
    getAuthUser : () => $authUser,
    logout : () => $authUser.next({}),
    openForgotPasswordModal : () => $forgotPasswordModal.next(true),
    closeForgotPasswordModal : () => $forgotPasswordModal.next(false),
    showForgotPasswordModal : () => $forgotPasswordModal,
    openProfileModal : () => $userProfileModal.next(true) ,
    closeProfileModal : () => $userProfileModal.next(false),
    showProfileModal : () => $userProfileModal
};