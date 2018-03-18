export const setNavbar = (menu) => {
  const SET_NAVBAR = "SET_NAVBAR";
  return {
    type: SET_NAVBAR,
    payload: menu
  };
}