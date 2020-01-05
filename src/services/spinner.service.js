import { Subject} from "rxjs";
const $message = new Subject();

export const SpinnerService  = {
    setLoader : (msg) => {
        $message.next(msg)
    },
    getLoader : () => $message,
    discardMessage : () => {
        $message.next({show:false})
    }
}