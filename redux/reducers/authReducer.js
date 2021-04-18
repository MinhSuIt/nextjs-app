import produce from "immer"

const initValues = {
  isAuth: false,
  token: '',
  user: {

  }
}
const auth = produce((draft, action) => {
  switch (action.type) {
    case "SETAUTHBOOLEAN":
      draft.isAuth = action.auth.isAuth
      draft.user = action.auth.user
      draft.token = action.auth.token
  }
}, initValues)
export default auth