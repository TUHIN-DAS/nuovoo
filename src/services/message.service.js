import { Subject} from "rxjs";
import {LoginService} from "services/login.service";

const $message = new Subject();

export const MessageService  = {
    setMessage : (msg) => {
        LoginService.closeLoginModal();
        $message.next(msg)
    },
    getMessage : () => $message,
    discardMessage : () => {
        $message.next({show:false})
    }
}