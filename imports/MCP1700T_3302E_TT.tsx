import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["GND"],
  pin2: ["VOUT"],
  pin3: ["VIN"]
} as const

export const MCP1700T_3302E_TT = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C39051"
  ]
}}
      manufacturerPartNumber="MCP1700T_3302E_TT"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="1.2350750000000517mm" pcbY="-0.9499599999999191mm" width="1.0700004mm" height="0.5999987999999999mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="1.2350750000000517mm" pcbY="0.9499599999999191mm" width="1.0700004mm" height="0.5999987999999999mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-1.235074999999938mm" pcbY="0mm" width="1.0700004mm" height="0.5999987999999999mm" shape="rect" />
<silkscreenpath route={[{"x":0.8760714000002281,"y":1.5361919999999145},{"x":-0.8763253999998142,"y":1.5361919999999145},{"x":-0.8763253999998142,"y":0.49458879999997407}]} />
<silkscreenpath route={[{"x":0.8760714000002281,"y":-1.5361920000000282},{"x":-0.8763253999998142,"y":-1.5361920000000282},{"x":-0.8763253999998142,"y":-0.49458879999997407}]} />
<silkscreenpath route={[{"x":0.8760714000002281,"y":0.45539659999997184},{"x":0.8760714000002281,"y":-0.45539659999985815}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=cefd4596db214da394d9632b2b88f8f2&pn=C39051",
        rotationOffset: { x: 0, y: 0, z: 90 },
        positionOffset: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}