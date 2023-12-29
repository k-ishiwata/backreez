import { SidebarWrap } from './SidebarWrap'
import { SubSidebarWrap } from './SubSidebarWrap'
import { NavItem } from './NavItem'

export const Sidebar = Object.assign(SidebarWrap, {
    item: NavItem,
})

export const SubSidebar = Object.assign(SubSidebarWrap, {
    item: NavItem,
})
