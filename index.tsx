import { useRP2040 } from "@tsci/seveibar.rp2040"
import { useUsbC } from "@tsci/seveibar.smd-usb-c"
import { MCP1700T_3302E_TT } from "./imports/MCP1700T_3302E_TT"
import { useABM8_272_T3 } from "@tsci/seveibar.ABM8_272_T3"
import { W25Q16JVUXIQ } from "./imports/W25Q16JVUXIQ"
import { sel } from "tscircuit"

export default () => {
  const RP2040 = useRP2040("U1")
  const USBC = useUsbC("USB1")
  const Crystal = useABM8_272_T3("X1")

  const decoupling = [
    { x: -5, y: 3, rot: 180 },
    { x: -5, y: -1, rot: 180 },
    { x: 1, y: -6, rot: -90 },
    { x: 5, y: -1, rot: 0 },
    { x: 5, y: 3, rot: 0 },
    { x: 3.7, y: 5, rot: 90 },
    { x: 0.4, y: 7, rot: 90 },
    { x: -0.4, y: 7, rot: 90 },
  ]

  return (
    <board width={21} height={51}>
      <copperpour connectsTo="net.GND" layer="top" />

      <RP2040 />
      <USBC schX={-20} pcbY={51 / 2 - 4} pcbRotation={180} />
      <MCP1700T_3302E_TT name="REG1" schX={-16} schY={1.25} pcbX={-2} pcbY={15} pcbRotation={-90} />
      <Crystal schX={-7} pcbX={-2} pcbY={-8} pcbRotation={180} />
      <W25Q16JVUXIQ name="U2" schX={10} pcbX={-5} pcbY={10} pcbRotation={90} />

      {/* Headers */}
      <pinheader
        name="J1"
        pinCount={20}
        gender="male"
        pitch="2.54mm"
        schX={17}
        schY={0}
        schRotation={90}
        connections={{
          1: "net.GP0",
          2: "net.GP1",
          3: "net.GND",
          4: "net.GP2",
          5: "net.GP3",
          6: "net.GP4",
          7: "net.GP5",
          8: "net.GND",
          9: "net.GP6",
          10: "net.GP7",
          11: "net.GP8",
          12: "net.GP9",
          13: "net.GND",
          14: "net.GP10",
          15: "net.GP11",
          16: "net.GP12",
          17: "net.GP13",
          18: "net.GND",
          19: "net.GP14",
          20: "net.GP15",
        }}
        doubleRow
        pcbRotation={-90}
        pcbX={-21 / 2 + 2.54 / 2}
        pcbY={0}
      />

      <pinheader
        name="J2"
        pinCount={20}
        gender="male"
        pitch="2.54mm"
        schX={22}
        schY={0}
        schRotation={-90}
        connections={{
          1: "net.VBUS",
          3: "net.GND",
          5: "net.V3_3",
          7: "net.GP28",
          8: "net.GND",
          9: "net.GP27",
          10: "net.GP26",
          11: "net.RUN",
          12: "net.GP22",
          13: "net.GND",
          14: "net.GP21",
          15: "net.GP20",
          16: "net.GP19",
          17: "net.GP18",
          18: "net.GND",
          19: "net.GP17",
          20: "net.GP16",
        }}
        doubleRow
        pcbRotation={-90}
        pcbX={21 / 2 - 2.54 / 2}
        pcbY={0}
      />

      <pinheader
        name="J3"
        pinCount={3}
        gender="male"
        pitch="2.54mm"
        schX={20}
        schY={-2}
        schFacingDirection="down"
        connections={{
          1: "net.SWCLK",
          2: "net.GND",
          3: "net.SWD",
        }}
        doubleRow
        pcbX={0}
        pcbY={-51 / 2 + 2.54 / 2}
      />

      {/* GPIO Traces */}
      {[
        "SWCLK", "SWD", "RUN", "ADC_AVDD",
        ...Array.from({ length: 29 }, (_, i) => `GPIO${i}`),
      ].map((pin) =>
        <trace key={pin} from={RP2040[pin]} to={`net.${pin.replace("GPIO", "GP")}`} />
      )}

      {/* Flash */}
      <capacitor
        name="C17"
        capacitance="0.1uF"
        footprint="0402"
        connections={{
          pos: ".U2 > .VCC",
          neg: ".U2 > .GND",
        }}
        schX={11}
        schY={1.5}
      />

      <trace from=".U2 > .CS_N" to={RP2040.QSPI_SS_N} />
      <trace from=".U2 > .CLK" to={RP2040.QSPI_SCLK} />
      <trace from=".U2 > .IO0" to={RP2040.QSPI_SD0} />
      <trace from=".U2 > .IO1" to={RP2040.QSPI_SD1} />
      <trace from=".U2 > .IO2" to={RP2040.QSPI_SD2} />
      <trace from=".U2 > .IO3" to={RP2040.QSPI_SD3} />

      <trace from=".U2 > .CS_N" to="net.CS_N" />
      <trace from=".U2 > .CLK" to="net.CLK" />
      <trace from=".U2 > .IO0" to="net.IO0" />
      <trace from=".U2 > .IO1" to="net.IO1" />
      <trace from=".U2 > .IO2" to="net.IO2" />
      <trace from=".U2 > .IO3" to="net.IO3" />

      <trace from=".U2 > .GND" to="net.GND" />
      <trace from=".U2 > .VCC" to="net.V3_3" />

      <resistor name="R10" resistance="10k" footprint="0402" schX={8} schY={1.5} schRotation={-90} />
      <resistor name="R11" resistance="1k" footprint="0402" schX={7} schY={0.5} />
      <pushbutton name="BTN1" schX={5} schY={0.55} />

      <trace from=".R10 > .pin1" to="net.V3_3" />
      <trace from=".R10 > .pin2" to=".U2 > .CS_N" />
      <trace from=".U2 > .CS_N" to=".R11 > .pin2" />
      <trace from=".R11 > .pin1" to=".BTN1 > .pin2" />
      <trace from=".BTN1 > .pin1" to="net.GND" />

      {/* Crystal */}
      <resistor name="R5" resistance={1000} footprint="0402" schRotation={180} schX={-9} schY={0.1} pcbX={-1} pcbY={-5.373} />
      <capacitor name="C15" capacitance="15pF" footprint="0402" schX={-5.8} schY={-1} schRotation={-90} pcbX={-5} pcbY={-8} pcbRotation={90} />
      <capacitor name="C16" capacitance="15pF" footprint="0402" schX={-8.2} schY={-1} schRotation={-90} pcbX={0.977} pcbY={-8} pcbRotation={-90} />

      <trace from={Crystal.pin3} to={RP2040.XIN} />
      <trace from={Crystal.pin1} to=".R5 > .pin1" />
      <trace from={RP2040.XOUT} to=".R5 > .pin2" />
      <trace from={Crystal.pin3} to=".C15 > .pin1" />
      <trace from={Crystal.pin1} to=".C16 > .pin1" />
      <trace from=".C15 > .pin2" to="net.GND" />
      <trace from=".C16 > .pin2" to="net.GND" />
      <trace from={Crystal.GND1} to="net.GND" />
      <trace from={Crystal.GND2} to="net.GND" />

      {/* USB Diff Pair */}
      <resistor name="R3" resistance={27} footprint="0402" schRotation={180} schX={4} schY={3.7} pcbX={0.7} pcbY={5} pcbRotation={-90} />
      <resistor name="R4" resistance={27} footprint="0402" schRotation={180} schX={4} schY={2.8} pcbX={1.5} pcbY={5} pcbRotation={-90} />
      <trace from="net.USB_DP" to=".R3 > .pin1" />
      <trace from="net.USB_DM" to=".R4 > .pin1" />
      <trace from={RP2040.USB_DP} to=".R3 > .pin2" />
      <trace from={RP2040.USB_DM} to=".R4 > .pin2" />

      {/* VReg */}
      <trace from="net.VBUS" to={sel.REG1.VIN} />
      <trace from="net.GND" to={sel.REG1.GND} />
      <trace from="net.V3_3" to={sel.REG1.VOUT} />

      <capacitor
        name="C13"
        capacitance="10uF"
        footprint="0402"
        connections={{ pin1: sel.REG1.VIN, pin2: sel.REG1.GND }}
        schRotation={-90}
        schX={-17.2}
        schY={0.7}
        pcbX={-2.5}
        pcbY={17.5}
        pcbRotation={180}
      />

      <capacitor
        name="C14"
        capacitance="10uF"
        footprint="0402"
        connections={{ pin1: sel.REG1.VOUT, pin2: sel.REG1.GND }}
        schRotation={-90}
        schX={-14.5}
        schY={0.7}
        pcbX={-2}
        pcbY={12}
        pcbRotation={180}
      />

      {/* USB-C */}
      <trace from={USBC.GND1} to="net.GND" />
      <trace from={USBC.GND2} to="net.GND" />
      <trace from={USBC.DP1} to="net.USB_DP" />
      <trace from={USBC.DP2} to="net.USB_DP" />
      <trace from={USBC.DM1} to="net.USB_DM" />
      <trace from={USBC.DM2} to="net.USB_DM" />
      <trace from={USBC.VBUS1} to="net.VBUS" />
      <trace from={USBC.VBUS2} to="net.VBUS" />

      <resistor name="R1" resistance="5.1k" footprint="0402" connections={{ pin1: USBC.CC1, pin2: "net.GND" }} schX={-18} schY={-0.6} pcbY={17} pcbX={2} />
      <resistor name="R2" resistance="5.1k" footprint="0402" connections={{ pin1: USBC.CC2, pin2: "net.GND" }} schX={-18} schY={-0.8} pcbX={2} pcbY={17} />

      {/* RP2040 Power */}
      <trace from={RP2040.VREG_VOUT} to="net.V1_1" />
      <trace from={RP2040.DVDD1} to="net.V1_1" />
      <trace from={RP2040.DVDD2} to="net.V1_1" />
      <trace from={RP2040.IOVDD1} to="net.V3_3" />
      <trace from={RP2040.IOVDD2} to="net.V3_3" />
      <trace from={RP2040.IOVDD3} to="net.V3_3" />
      <trace from={RP2040.IOVDD4} to="net.V3_3" />
      <trace from={RP2040.IOVDD5} to="net.V3_3" />
      <trace from={RP2040.IOVDD6} to="net.V3_3" />
      <trace from={RP2040.USB_IOVDD} to="net.V3_3" />
      <trace from={RP2040.ADC_IOVDD} to="net.V3_3" />
      <trace from={RP2040.VREG_IOVDD} to="net.V3_3" />

      {/* Decoupling Caps */}
      {Array.from({ length: 8 }, (_, i) => (
        <capacitor
          key={i}
          name={`C${i + 1}`}
          capacitance="0.1uF"
          footprint="0402"
          schX={i}
          schY={8}
          schRotation={-90}
          connections={{ pin1: "net.V3_3", pin2: "net.GND" }}
          pcbX={decoupling[i]?.x}
          pcbY={decoupling[i]?.y}
          pcbRotation={decoupling[i]?.rot}
        />
      ))}
      <capacitor name="C9" capacitance="1uF" footprint="0402" schX={-1} schY={8} schRotation={-90} connections={{ pin1: "net.V3_3", pin2: "net.GND" }} pcbX={5.5} pcbY={5} pcbRotation={45} />
      <capacitor name="C10" capacitance="1uF" footprint="0402" schX={-5} schY={8} schRotation={-90} connections={{ pin1: "net.V1_1", pin2: "net.GND" }} />
      <capacitor name="C11" capacitance="0.1uF" footprint="0402" schX={-4} schY={8} schRotation={-90} connections={{ pin1: "net.V1_1", pin2: "net.GND" }} pcbX={-1.2} pcbY={7} pcbRotation={90} />
      <capacitor name="C12" capacitance="0.1uF" footprint="0402" schX={-3} schY={8} schRotation={-90} connections={{ pin1: "net.V1_1", pin2: "net.GND" }} pcbX={2.75} pcbY={5} pcbRotation={90} />
    </board>
  )
}

