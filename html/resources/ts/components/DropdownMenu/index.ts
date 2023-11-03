import { DropdownWrap } from './DropdownMenu'
import { DropdownTrigger } from './DropdownTrigger'
import { DropdownItem } from './DropdownItem'
import { DropdownContent } from './DropdownContent'
import { DropdownDivider } from './DropdownDevider'

export const DropdownMenu = Object.assign(DropdownWrap, {
    Trigger: DropdownTrigger,
    Item: DropdownItem,
    Content: DropdownContent,
    Divider: DropdownDivider,
})
