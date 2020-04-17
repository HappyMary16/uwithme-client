import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import i18n from '../../../locales/i18n';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1)
  },
  image: {
    width: 200,
    height: 200
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

export const UserCard = ({ user }) => {
  const classes = useStyles();

  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item className={classes.container}>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExIWFhUXGRgYGBgYGBgXGxcXFRUXFhcXFxcYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYBBwj/xAA4EAABAwIFAgMHAwIHAQEAAAABAAIRAyEEBRIxQVFhInGBBhMykaGxwULR8FLhFSMzU2Jy8RQW/8QAGgEAAgMBAQAAAAAAAAAAAAAAAQIAAwQFBv/EACoRAAICAgMAAQQBAwUAAAAAAAABAhEDIQQSMRMFIjJBUTNCcRRhYoGR/9oADAMBAAIRAxEAPwDMalDiHS5Ej7IFxuvPQPcSYwrhTpF+VynXIBEC/YE/VWpFTGvcOB6ytX7L5tw4gHr17rK6g25uVC2s5pDgbi6ko9irIrVHt1DFtqN0kTZVGY4IttptwVQZBnYLQdV+R0PdazDZlPQz1VE0p6l6Y4qWJ2vDM1stkzwhsU4tGlvO5/utFnRYI0RJuRuqb3XvDa/H8hIo06Ohjydo2/Ctfg3aQdMN67E/NNOnTDW3PJib/ZXDcv8A8wUzuRI9OiuqWStAO5kLRGEn+hZ8iEfWYo4N54sObKQ4R8DS2O8rb0spa0lxmCAIOyLblzYgNj8p48dlMufBHntPB1A4GETiGuc0jkmfvMrcV8sAv67qvOWh14hLLDKIY82EzCvpFu4PdMeYGoEH/je0crVY7AFoGlpdP0VZicrn9MWVdNemuOSMlaKHmUZVebQPIjon1MK5pBauGmYB/n9kLGYNJHZbH2YoNDJBHmsvltEvqRHN1tDTFGi4tEQCrILdmLlS11BM7xfvCWNu1v1KzdTCuvEAfVRms4umbqVtVxG4/Kpcm3bL8WNQVIgp03DlL4TdJ9M8H0KdSdMtcI6FSy05UaOxPVBVHeK6LdO3CHezkqERFZJO0hcUCcrWbHJ+yBrtiAdzeO34WgGT1KhbMNGnVJMABUVaiNZ0mRPxHkfsr4qvSlzUnSIjGzWwPmfmkWaRJ9E6o+LD1KHeSblOnZKpEbnSUwqTSpcDgnVXhjf/ABMmK0dyk1Pef5Ynr0jueF6Hl2DqENEi/wBVJ7NZMxgLRBI3Ec8klazD4QNEACI4OyHw/I7ZjzchY9Ip8NlTAbgyJ3PBROX5Q1kkWlWvuWhtzA7m/ohq+OAMADbYkNt1lXLFCO2YXyMk9RHswoBEkE8TE36KalREnb9vNA4bNGOfpLWs28WrUD2lRVM5pBzxZxEmxsYE+qsUoVdlThlbqiyf2/t5yULis8oM8JfJ7QfqsXmvtFWqEt16W9BZUz6pO5WPJzN/YjoYfpjaubPRKueUSAdQTcPmdJxjUsJTfYd02jUhwM7SqXypt7L19Oglpno7Q1wgfPhD18AIJWOwebupkHUe4OxC3WXV21GNeNnffotGKay6Zkzwnx93ozoyhzWk/ETO6q8ZlZHYlbyvTny8kPVwoI2upLjp+FmPnv8AZkPZnBHW7WPELhXWbv8A8pwPSFzE4Es8bSQR0580BicZrYWmzj6A3VTuEWmXf1JKa8KFxaDdOMRaF2vhfEZKHfTHBWdG47qPIS1g9h3XHVCBxCFfX6IhQZA6qGqQBcJgmJKY53UIho74ei6opCSFko0WY5Y/EVSTLWCw4EDhZXGMAJDfhBj5L0jPg33ek1NDRY2cZ9QsPmdGmSPdPDutoJPrutc4tGDjZL9KYAchROajX0HTsmGmRu1J2NoLRbLgNOqTt1XpHsvkTWtnSBqg+RHF1m/ZrKHPdrgggS2QvRMka+7ajRaIO30Ctx/dKjDy8nWOiwwWFa0Tpgnyk/JRZhmLKA8Qt1PPYRddzbFCnTJ1EQOImTsL7LzzEVH1XEg6iP0k3jsTuVbmzfH9sfTn8fjPO+0vC3zj2nL/AIQI73PnKp8RjfetBkSJ1dT0v5ICqS0te3rsbwe4K5mOKD4hgZaIHJ6rA5Slts7GPBCFKKHU6pFpNrgzI63+yOw2Ylwc0tGoix2VICdptuFNQqOBki07pP8ABocU/R9Vskpq48yT5roMc3S0WoJBAieFA83K4KllyZQoiQ5t1qvZvFxhqzZ+G7f+3YfJZMOurGjjDTZYw5/xHt0T459HZRycXeNG6w2cANb70tBPF7ecbI2jVY+7XA9uV5hWxZPPmi8rxLw7wkz1lXx5cr2jmz+nKrTPQcW0mYb9Vns0y4nbcKwwntAyRTqPl39UfdGGiCSZnUtM1HKrM2KU8D2Y8Bo8NQT0I3HmOULVo0nfA6/Q2+6vMflAkv5WZx2EMSJBE+qxSh100daE1NXFjalAi2knzshXuANmQR3+sLuGx722JkDqphmMTbdBIstgbqkrgYT+r0RbH0zNt7J+IwxfLmc7gKB7Afu11O/+Cr/Q75JJQ2jYUM0qMBBhzTaHiQR+FWYrDUyCWYdgO+7vyrStSHIj6JU8PqaWg79Df5q9OflmCLgt0Y3G+/BjRpH/ABChy6k6o+C6BzP2WnqUNA0iTB3P7ojIsFTeXBxbcEabTNrg8pU23RplkSjaNFkGAaxjTA1ERLdiAr3D0lXZNlpos0F2oTN5srPEv0NERJNpXTxrrHZ57kz7T07MT7b13AhpP6ifTZo+6yNRwNiNLhzsVp/bBoYWydZeSXO6ExZvQCFl8RhiPEDq+ZPrK5ef82zvcNL4kiJvIlR1b8QukQmls7KtGwQU7Khd2De4/wDUO6UzlFaIwmpHB33CY0fROr04g/z+WTSZUGTHv7JB1oTGroJGyWghOFAJuNrqOo8lxK6zwtJ5OyhFQkqUK3sla3kmApaeNLbBDF077LjWEnuVEBoscLigZLgtHkOdD/Tebceqx4bAU1OqZTRm4u0U5cEcipnpj6IcN5WezPL95EQpvZXM9c0nmSLt/IVviKcyOvJ7ra+uWFnIjKWDJ1Z5rjsN+oDzQWnoVr81w0S0jfoFl8Rh9JKxtNaOvCXZWiKphnC/B6KbAVTTm5+oTZc3lNcetkVsNFj/AIs/qUlUw3+pJSgdUFYnMqrydx5p+DqvFy4+YKDFQHqpG1paYJBHCZbD0VVRc0cQSCA4nrfqrvJMsaXBx4MhZ7Iaerxck9Oi9DyKgIjpeY2TYo95mPlT+ODos6lQU2a3GwWMznO9Tpa8ttAvMf3V37YV/wDLDJtv5niey8/xXVWcrO0+iM30/jKS+SQ2tjyCWklw7/dQufMxN1GHAOBLQ4AzG0juuFwnwyBNgTMdlk/VnZUUvDski8wodF7KaJNjPVRab2RChpEJocBuF0yLBIG/VQgQ6sXMjiZ9RP7odgkiLKSncEeqiaOEQIeXf+KbCMkmWi15UNOxtdFfCwzuVGFg1Z5J7cBICJlRgpwbNyUpBNdNuFNTcZ8IUE9BZT0gesBQg4MlPPEBJ7XcQAnUabzbV90oWF5dXLHtIMGV6NEgHtKwuX4RtM6qjwO8SfQLY4HOqVSGh14i8CYiPytfFaVps4/1CLk04rwgzKkHW2KxWb4PSSB5r0E0xHfnqszm+BaXGoZsPSybPD9g4Wb+1mRmbQBblM9yTfgWU+Mpx4hB1GyHmNysx1Dnum9klJLf6SkjYNgpwzgAePMJaztHkoiSbbonC3c3eP2TMsZfZXQcNAbxC9GytulocTxf5LGZVGkbzPpCvHYw6SAYgKYMqg22cvmQeTSAfa/MRqhvqepIH9ljn4iTtdHZwTrvMFVj2qmcu8uxv4+JQgonKj5JKY8hPDehld93O6CsvGMqEAgAX5i/oUTS0Pb4pB7fnohYjlcp14Pnv0jpCf0VnXiDEfM/2TS8Rb+/zRNGsPhdBHBUeKpaRIu3t/N1AEeGEPHy+aa6n4jPBP3Ujat4aTE890/FUyHmRY3RQLIaerZvXdT5nZwbyBfzKWDcC4mIi9uyZWBJ19f5dRkXoPPAClGnmU3WTxspNR/pH5QDYveNbsPmkx7r6dkVSwYIl3h8/wAKao9lNu1/LdANoHo4ebuMBSvxYaIZPmghUL3SfkpdFx9kKD76IPLviNlNSsZBsh6rXE3+8/ZNuDeyDRGjZZFnZkMfccHorzF0w5pkWvZefUHR2XoGBdrptP8AxHz7rbxsjkurONzcSxyU0YvGBr2ywadJ2IVeMCANTnCTePzK1+dYcabCPJYyo8AibwdlVkh1dG7Bk7xtEupvVJM/+mn/ALf1XVXReVLWxz9bo7LRrfEQFXls7lWmRNBf1uAml4NLw2mVYYQrJuAmYsCFFlDQArGvVDabiTEg/ZWY8ceuzjZsku1IxOcv93ULDwqepWm4AjpEq3z/ABdCq/wgti02uqmlRYL+8jyWd0m6Oth/FX6cplhPj1Af8Wg/crhFMHd5HWwPyS0vAsZb5p7MOTbwj1+yax2gd1ODwQT1+6jNjwPK+yLGAe7aIhcOWOmPeNnoD+6iJaAtcNJcJj0KmwWYjYssetxCKq5a5tz4h0t/CqzC0ahJb7sg+RtPPRNQjkg3GYcg6m/Am4yk57GO7QfRTZTIf7p9wbEHg9eyOzLNqeHIpspy5pLXtfJBnkEdIBCMIXsqlkp0BYVmin4hD3W6WQrS4Gwj6q/x2Ttqtp1vfsDC1pN7zF4b1lR4OoxrXe4swm9aqNxyKbRcndM8TXoqzprRXswB58J3vbftwp8Ti2UwGiC/l1j8kJmFeXQ2SP6nbu7koYU28yT9FX4XK3tk3v3GST6oes+dynClzIjp9kjb9JvtKBajlMWXGsJKTg47qRrGx+yFDDxTI2ICk9zO5UYc3ofqnEsItqB85SsAfQotGw+ZlbnI3/5Df5aVgMG+D1816LlLmmg0tECCI9Vp4X5nJ+p/gv8AJVZ2QG7rCYy7uy13tDjGB2gm8LHVxfaybku5F3Bi1DZz3Y6rqjukstG6gEujhW+QOsSOvkqpwINuOyufZ8E9Pi6eSsn+JJvR6BlDPDJsqr2kxYMU5IEwfTlW2AHgtus37QPisW7kXuLXv80+RuONJHLwxUszbKTGBg2BH84XX4FjhrpusLkGxHod119IOdvp5kfgDZSe7pAfE8ngH8qmNHTeita0zaSE46t/RHe9axpaGy5wMu6dIQ/uw6BqPJM2ExsJRaDYwUiLkd9/2TX0g4fEWn5j6oqjhzYA+EzJIIiOe67TxBa4ANkd7/cIeAe/CPCOq07uMtHIP4OyVb35eS3EjTuNRMxvGkN42UuKra26Q3TPS+xULMO2zdzPE7pu9Fbje2WDsbWp03Vm0KLw0gOeJkWkOLDt5rJ47FmrUfUO7iSfXotvWxQw9GpRaC6pUaWwL7jaB91kM0yWth2sdVbAePCQQdrwYNjdaVuOjPFpSd/9Fp7HYFuJrBlR5DG30yb9uyI9oa731HNLfdtb4Ws4aB953lE+xOQVA8VKzalNjmB1NwIbr3Mc8DYqfHe0THO0ua57RbxlpNu+mfqpNfYkxISbzPrtGdZEXebJ73ndp+XKu/dYSsJDix3f9+EC7Ki0+F7XDsQsrVG2E1+ytDh0XWuPBsj34dkQQWuHINiPJC1MO5vw3HZQsUkR6zyT9/uu0y47Fvzg/JRud1SY3upYSYBwROGIb8VNp85/BQrB/wAvmpyC3hKyPegpjb2bH87rf5Owsw7Qd4n53WR9n6Hv3aSNoMra4+qGtj5ABauHFq5s431CdtY0Y/2iIJki/wBVlKpM9lo88fO6zh3lUzlbZv4yqKRDJ6pIrX2HySVZptFfVpGIlXXs3Tix/v6KvxLgwXHkAifZ3ElzzPYq120Vzej0nAPho8lk87brrPLjErUZJVDmWv8AhVPtNhhq1cH7psyfRM53HklmaZmzRZ/uE9gIP3UVaiN2vk9CIP0spQwGzXARvP4hRDQ03Ort3VCejqC0utdrpjYbeaed9wTx0+RTjWdBAaQI2ghRAlo0gk6rEAflQhNUAMatRHYAduU3S02a57hHQeolRAxvvECeAk6oXQNhtA5UtEpkuq8XbOwmSfVWuHwnu26rNcRd7hZg7D9ToQVOKY1OjVaB/THJUVXFSQYJjeTY+iZOiuUW9Imr4wCW0rSRqcfjd5n52Vxl+PpspCjUbrE6nT+mwhZ6idVQEiAJcT15QdR7nEm9zP1TLI07QksEZLqzYZjn2ir4iHU4aQ3pDbQeFm8ywbT/AJtIeHc9p6pmMcCRJggAc9Alha/u5FzxG4IO4KEsjl6HHhWNfaDMotMSfMbeUFSVKbW3DnH6QpMdhhTIcBLHbfse6GeZ2sl8L1vZNSx5G8geYP0KkGOvw7uLIKO3rK5byQDSLD3lN28/JRVsGSJZcdlACRuAfO6Iw5NrgKWRqgdoIN2z5qxy7BPcW90ZhsUGgSGP/wCwB5W1yYsfSBpsDSSAbCAP1RAVuLGsrqzFyuVLCrojyDLfdt1ECeDyos5xRbYq7rnSLC3r9llc/rgAmFtyJY8fVHIwN5svZmRzXEkz6qqkiIReOdPCHoAkgR3XPR34qkPk9EkfpCSg1lBmFYkiLhSZZW01W2N7fsoKlUuuBE8dEwVHA+V/qr61Qh6fkT9Egk3vHyVhntEVKUji/os1keN1ATEWWtwbdTYUh90XE52ZdJ9zAHDSSARE3MwnV202Elg8pv6qwzLK9FR0cE/IoI4Tcl4npdZE2tHTUlJJ2BgvqEy6ByeAuFrQPC8k97D7ynYtrtuE1tIRqOqeBHM8ph0cAI+LcotxawWA/uoiQPEd+iidXkyQhYas4+fiN0xxtM3XTVJF4iZ726dFKymH3FuyITgMU9X9Vp8rlCkngeqKxtQWaNh/JQ0z1UQET4sWpnki/wA1DuJRVSjqY2+yi1wbcJQxCMPUDmlrpIP07wq+swtJB/gRVOoJ6KSswPBvdv2RsFUAspF23yThLTDh6FdHhNwHev2IXahHBPqiE6x4Fo/kqQweY7JNpnkSOoUhw46/NBgeifC0STuB0XonsrDcPfeSsHl+AqEjSCQSvQcLS91Taye58zutHDtTs5P1KScepLmNSGrAZ7VqajJlvC2mZVxpt6Lz7NMYWu1G4BH3sruVO2kVcDHSsLf7OuLbXJF77eir3YB1IgEXNr9loMpzVtQztHXlTZnT1+INki6rljjVxNSzTUusjN//ACu/qCSdFX/bSVVMv7Ip3U44QGJcJU9THkWlMdUDhJ9VYkNZYezmPE6Tvwey3uQZkDUDRfeV5UyJkbjZbf2SzgOMQ2f1EwIUSammijNFSgzZ5tlortlnxCY7rC4/CPY4yLjcflej5dVI7d+qnxOGZWkOZtzt8itGTjKf3L052HmSwvrJWjyjW6Nkn/5bQ53xHYfkrf4rIqVMOeG6gBzfSesHhYHNcOXO8RiDM7+kLFkxSh+R1uPyY5fxA3P1X5TXlEANA63TCO0E8eapZssHci8MDePIeageALC5UhdAA9UQsVWGmeeO0JheXbFo/nVROk7p+yKYtBOHBDXA7ec/ZMLWcTPn9dlLSdqBQ4aZSt7JEaBcp1B4DhOxt8017VE7hFMb0JxbAw2EtKg0TsfRTNdPhP8AD+ycKBCaxPAdjnDiAFZ4apMWlOo4B7hMf37ALXZXkOgNc+LAcc73RUHPwz5s8Ma2GZLgw2kCWhrjfyB2RFarA/P5Q+Jxg1b2VZmmYaW7rV3jFUjkLFLJO2QZrjgBusHntYuIHqfwjs6zSLTLj/LoCmffMj9Q2Kqim32Z04RUFQHg8Y6mbFajLc8DokmeVlHMM38kVgcMXOMdCfkmcb8Hl1a2bn/FKfdcWF96/qkj1kJ8eP8AkB0xzJTffkghSPc255QpcrEMxAIrKw8PDm/2I6FcwOGc8rUYHLw0AxYJZTrSFejRezucEOGsu8UCCRA4t2W394YIG68ix+OB8LZjr9lcez/teaTtOI1EG2u5iOrVbhy9ftZg5PFlP74npZ8THNNwRELKZxleomwDekHeNwr6hWBAc0gtgEEXspqnii/furs2NZEYsGWWGVo8uxWALHEHYTdBned/3hen5hlFKt8XhdtI581QYv2OI+F7Y7z+AudPizT1s7eH6hikvudMxtClymF03/l1os0yj3LY1Bzv1ReOgVHXpRZUNdXTNkMimrj4RvpTtGyad0bhKMyhjT8RsoHtsmy+q2dJETaehTA0gqLDNurXE0bm1zf53Ul4S6ZXVGbqH3asnUwpMHgC6RBJ4jqlQXJJWyvbQ4W59nckbVotdUEHg9R3BUGS+ybiQ6rIb02J/stmwNYA1oAAtbouhxePf3TWjjc/nL8Mb2A4XKqVMzu7v+OAmZhWDZBITsdjmtkkzCx+bY/UZJPQdFZnyRxx6xMvHwzyy7SO43FRN/ks7mmYGOqhxWPiWtMnvwg6dR03g+a58Yv1nZUVFaK+pScTqdzzwjMsBD2kHYo8Opu+JseRWkybIqZaKjA13TU6wPcALZij3ejPnzLHG2czf2ap1HS1wY7kGwPcBOwOV0aDdOtrqhN42EcK2p+y/vKnvKtdznCBaw9OyVT2OaJLKjg65vffquh8STujjvkWurkBf4VR6JKy/wDzb/8Ad+6Sfr/sL8v/ACPHcTQ/U3Y/RRU6eogQidStslwEu1R5LlOdI9I4heU5Y6Gho/7JZ9mGk+7ZxYlaZ4bSpEzwY84WHqBuouJkmSq0q9KYvvK/4B6zHATddp1dVj81NTJMpe78kbLi99m/aN+GqBlSXM2+IwF6Jh8c1zxp2LdQI7kWXjeoHdXWVZy6jFzFhO9pnZXQyuKMefiLI+y9PWm1LKdlUCyyGWZyH31cDw9O8q3w+JuTMniVqjmTOXk4sovZZ47DMqtLXt9efmstj/ZCx0OB6A7q/diDa/8AOykpVzFzZJkx48j2g4subCvtejE4fKq1Br/8okuttNuqBZlRc4WjrI2XpbKgXKr2kbAql8NVpmmP1KX7iYbL/Zp1RwkQ0c/stZisnpPABAkWt06XRLayca2/VW48EIxp7M+blZZyTWgOjkVBo+AHzuiWUadP4WNb5BRVMY0bndB4vGgXPCZ/HBCr5cj22WGIxWkIDMMx0t3WaxWckvINgLjyVFmGdiT4ie28Kh8nt4bMXBpqy2zHNQQdR/8AFlsdmhdZpt1QmJxhedrJlJhJgBZetu2dKMVFaJGsm5k+inbS7EdyCmEPFog+YPzhGUcHUduTfi6NBsGLebeo3Wu9ialQ1i2PCWnUOIGxVTRynWfG6JPJsB5C63eSYAMZpoubJ+KoTJPkBstPGxtzsw87Kvjar0uqbAwW26Rt5Lj3OaN5PAjdPe/S0lzrAfP0UeHc6pBPhbwOT37eS6EvTgR8AZxP9ISVr4f+S6psNo+f8DhPePgbLcZdgdDC4xAH2VT7N4TqLm6LzzMre7G2xXG7W7Z6qdyfVA2NzcPJZEtQ3/xtgwAZ8rIP3vGw7Jzajm8pXIfpS0MfTfJGwUHugOTP2Vma4eIgA9R+UI/BRubfL6poyQPAVzATuk53E+S46mAdrJwdHCNBsfhsU+ndh8wrvC+0LwzSSW9SLqiI52XGvvKlAdP022Dz+Y1Om2/by6q3ZnDA3cwJJHW2y83Yz9TeFG/EVGE6XmDeJ+yMXL9Monhg2eoUMw95peDFja3yUFTM9MAWt178rzo5vVbeR1uNuOCEz/HalgQ0ie8/UouWStCrjQs9Fdm7gdwuVs5aN3LI4bFl6nrMhhJKVTn/ACCWPGnVFpiM/ZTsDHnef2VFXz5xmC43kcenkgazmn9IlNDCq279L4wS8RHiKlSqbmB0H5UbcF3Reg9QjcJhqf6pcOocBHzsim2M9FbQwreTJ6CBKMow2bNHYnb0F1M6nRZuHG/BB45I5lOq5g2PhmNtQaSPorEgbYNTxb58LQO8f2TxXdsahv0UorPc0S4BoEw20SdrKJ9QjoTe+/lulY6Q00yNy4+hmUdleKfScCHnVMx23QuGp8udve+3ryrLJcFrqtBPN+gHJ+SMJPsqFyqPV2bHP6FeqaTqL9Lmw4gtlpB6+W6scFmD2uFOq0BwaCSNiefIKtxXtUym7SyHRaT07AK3weMp1mirAsDqHSBK60ckW6T2ecyYsiirjoM/xCn/AFD6rqzv/wCjof0N+SSb5YfyVf6bJ/Blcm29FR5h8R8ykkuH+keph+YEi6mySSDLWQ0t/wCdUXi/hK4klXokit4UBSSWhEJGJlLnySSQYoVgdnIbEbt/6pJJ14I/SLFblCDdJJFfsKNBluyssV/p+qSSq/tKJ/milqfEpHbJJKteGsVDcef5COxPxHyP3SSUQrJB/pD/ALFD0viHmF1JW4/BwzF70/VcH+ofJJJGQqIKnxK7yfn/AKFdSVcfULl/EqKO/oth7M/6GI8j9lxJXYfzM3L/AKf/AIYxJJJAU//Z"
            />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container className={classes.container}>
          <Grid item xs container direction="column" spacing={2}>
            <Typography gutterBottom variant="h5">
              {user.lastName + ' ' + user.firstName + ' ' + user.surname}
            </Typography>
            {/*<Typography gutterBottom variant="h6">*/}
            {/*  {user.username}*/}
            {/*</Typography>*/}
            <Typography variant="body2" gutterBottom>
              {i18n.t('phone')}: {user.phone}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {i18n.t('email')}: {user.email}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {i18n.t('institute')}: {user.instituteName}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {i18n.t('department')}: {user.departmentName}
            </Typography>
            {user.role === 1 && (
              <Typography variant="body2" gutterBottom>
                {i18n.t('group')}: {user.studyGroupName}
              </Typography>
            )}
            {user.role === 2 && (
              <Typography variant="body2" gutterBottom>
                {i18n.t('science_degree')}: {user.scienceDegreeName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
