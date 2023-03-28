import React, {useContext} from 'react';
import { UserContext } from '../../../context/userContext';

export default function PagePrincipal() {
  
  const {idCompte} = useContext(UserContext);
  

  return (
    <div>
        <p>Page principal Association {idCompte}</p>
    </div>
  )
}
