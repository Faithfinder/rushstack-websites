import Layout from '@theme/Layout';
import React from 'react';

import { AppSession } from '../api/AppSession';

interface IMenuItemProps {
  title: string;
  focused?: boolean;
  linkUrl?: string;
  linkOnClick?: () => void;
}

function MenuItem(props: IMenuItemProps): JSX.Element {
  let result: JSX.Element;

  if (props.focused) {
    result = <div style={{ paddingTop: '10px', textDecoration: 'underline' }}>{props.title}</div>;
  } else {
    result = <div style={{ paddingTop: '10px' }}>{props.title}</div>;

    if (props.linkUrl) {
      result = <a href={props.linkUrl}>{result}</a>;
    } else if (props.linkOnClick) {
      result = (
        <a href="#" onClick={props.linkOnClick}>
          {result}
        </a>
      );
    }
  }
  return result;
}

export interface ICommunitySidebarProps {
  appSession: AppSession;
  navItem?: 'events' | 'past-events' | 'profile';
  style?: React.CSSProperties;
}

export function CommunitySidebar(props: React.PropsWithChildren<ICommunitySidebarProps>): JSX.Element {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div
          style={{
            paddingTop: '100px',
            paddingLeft: '50px',
            paddingRight: '50px',
            flexGrow: 0,
            whiteSpace: 'nowrap'
          }}
        >
          <div style={{ fontWeight: 'bold' }}>Member Actions</div>
          <MenuItem
            title="Upcoming events"
            focused={props.navItem === 'events'}
            linkUrl="/community/events"
          />
          <MenuItem
            title="Past events"
            focused={props.navItem === 'past-events'}
            linkUrl="/community/past-events"
          />
          <MenuItem title="Your profile" focused={props.navItem === 'profile'} linkUrl="/community/profile" />
          <MenuItem title="Sign out" linkOnClick={props.appSession.onNavigateToSignOut} />
        </div>
        <div style={{ flexGrow: 1, ...props.style, paddingBottom: '100px' }}>
          {props.children}

          <div
            style={{
              paddingTop: '50px'
            }}
          >
            ⚠{' '}
            <i>
              This feature is experimental. Please{' '}
              <a href="https://github.com/microsoft/rushstack-websites/issues" target="_blank">
                let us know
              </a>{' '}
              if anything is broken.
            </i>
          </div>
        </div>
      </div>
    </>
  );
}
