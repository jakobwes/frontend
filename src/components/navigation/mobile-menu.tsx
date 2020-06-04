import {
  faCaretDown,
  faBars,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transparentize, lighten } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface MobileMenuProps {
  links: MobileMenuLink[]
}

interface MobileMenuLink {
  title: string
  url: string
  icon?: IconDefinition
  children?: MobileMenuLink[]
}

export function MobileMenu(props: MobileMenuProps) {
  const { links } = props
  return (
    <List>
      {links.map((entry, index) => (
        <Entry key={index} {...entry} />
      ))}
    </List>
  )
}

interface EntryProps extends MobileMenuLink {
  childKey?: string
  isChild?: boolean
}

function Entry({
  url,
  title,
  icon,
  children,
  childKey,
  isChild = false,
}: EntryProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <li>
        <EntryLink
          key={childKey}
          href={url}
          onClick={
            children
              ? (e) => {
                  //TODO: Also close open siblings
                  setOpen(!open)
                  e.preventDefault()
                }
              : undefined
          }
          isChild={isChild}
          open={open}
        >
          {!isChild ? (
            <IconWrapper>
              <FontAwesomeIcon
                icon={icon !== undefined ? icon : faBars}
                size="1x"
                style={{ fontSize: '23px' }}
              />
            </IconWrapper>
          ) : null}
          <EntryLinkText isChild={isChild}>
            {title}
            {children ? (
              <span>
                {' '}
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            ) : null}
          </EntryLinkText>
        </EntryLink>
      </li>
      {open && children ? (
        <>
          {children.map((entry, index) => (
            <Entry
              {...entry}
              isChild
              key={`${index}--${childKey !== undefined ? childKey : ''}`}
            />
          ))}{' '}
          <Seperator />
        </>
      ) : null}
    </>
  )
}

const EntryLinkText = styled.span<{ isChild?: boolean }>`
  display: inline-block;
  vertical-align: middle;
  margin-top: ${(props) => (props.isChild ? '0' : '0.45rem')};
`

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  .Collapsible__trigger.is-open li a {
    background: ${(props) => transparentize(0.8, props.theme.colors.brand)};
  }
`

const Seperator = styled.li`
  height: 28px;
  background-color: #fff;
  border-bottom: 1px solid ${(props) => props.theme.colors.lighterblue};
`

const EntryLink = styled.a<{ isChild?: boolean; open?: boolean }>`
  display: flex;
  align-items: start;
  padding: 16px;
  color: ${(props) => props.theme.colors.brand};
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.colors.lighterblue};
  font-weight: bold;
  text-decoration: none;
  font-size: ${(props) => (props.isChild ? '1rem' : '1.33rem')};

  background-color: ${(props) =>
    props.open
      ? transparentize(0.8, props.theme.colors.brand)
      : props.theme.colors.bluewhite};

  ${(props) => (props.isChild ? 'background-color: #fff;' : '')}

  &:active {
    background: ${(props) => transparentize(0.8, props.theme.colors.brand)};
  }
  @media (hover: hover) {
    &:hover {
      background: ${(props) => transparentize(0.8, props.theme.colors.brand)};
    }
  }
`

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => lighten(0.3, props.theme.colors.lightblue)};
  border-radius: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.lightblue};
  text-align: center;
  margin-right: 10px;
`
