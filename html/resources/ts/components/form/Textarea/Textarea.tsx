import { styled } from '@/stitches.config'
import { inputBase } from '@/components/form/base.styles'

export const Textarea = styled('textarea', {
    ...inputBase,
    height: 'auto',
    lineHeight: 1.5,
})
