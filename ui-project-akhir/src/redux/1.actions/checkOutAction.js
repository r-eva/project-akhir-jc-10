import {
   FIRST_CHECKOUT_CLIKED
} from '../1.actions/types'

export const firstCheckOutClicked = (objCheckOut) => {
    return {
        type: FIRST_CHECKOUT_CLIKED,
        payload: {
            timeOutClick: objCheckOut.timeOutClick,
            dayCheckOut: objCheckOut.dayCheckOut,
            tampilDayCheckOut: objCheckOut.tampilDayCheckout
        }
    }
}