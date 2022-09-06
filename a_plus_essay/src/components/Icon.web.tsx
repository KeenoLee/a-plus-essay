import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { IonIcon } from '@ionic/react'

export function AppIonIcon(props: {
  name: string
  color?: string
  size?: number
  onPress?: () => void
}) {
  const color = props.color
  const ref = useRef<HTMLIonIconElement>(null)
  const svg = ref.current?.shadowRoot?.querySelector('svg')
  useEffect(() => {
    if (color && svg) {
      svg.style.fill = color
    }
  }, [ref.current, svg, color])
  return (
    <IonIcon
      ref={ref}
      name={props.name}
      color={color}
      size={props.size as any}
      onClick={props.onPress}
    ></IonIcon>
  )
}
