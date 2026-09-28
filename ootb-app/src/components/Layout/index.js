import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import './Layout.styles.scss';
import { routes as defaultRoutes, actionRoutes as defaultActionRoutes } from '../Sidebar/mock';

const Layout = ({ children, routes = defaultRoutes, actionRoutes = defaultActionRoutes }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [parentActive, setParentActive] = useState(routes[0]?.value);
  const [childActive, setChildActive] = useState('');
  return (
    <div className="layout-container">
      <Sidebar
        isMemoryRouter={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={() => setIsOpen((prevOpen) => !prevOpen)}
        routes={routes}
        actionRoutes={actionRoutes}
        parentActive={parentActive}
        childActive={childActive}
        isCloseWhenClickOutside={true}
        handleParentRouteChange={(item) => {
          setParentActive(item.value);
          setChildActive('');
          if (item.link) navigate(item.link);
        }}
        handleChildRouteChange={(parent, child) => {
          setParentActive(parent.value);
          setChildActive(child.value);
          if (child.link) navigate(child.link);
        }}
      />
      <Header
        title="OOTB"
        userName="Pradeep Kumar"
        showNotificationIcon={true}
        notificationIndicator={false}
        isNotificationDnd={false}
        showHelpIcon={true}
        showMessageIcon={false}
        showChatBotIcon={false}
        isMessageIconDisabled={true}
        isChatBotDisabled={true}
      />
      <main className="main-content">{children}</main>
    </div>
  );
};

export { Layout };
