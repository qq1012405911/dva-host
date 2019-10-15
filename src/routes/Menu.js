import React from 'react';
import { connect } from 'dva';
import MenuList from '../components/MenuList'

function Menu() {
    return(
       <div>
           <MenuList/>
       </div>
    );
}

Menu.propTypes = {
};

export default connect()(Menu);
