exports.devices = ['Montavetture A', 'Montavetture B', 'Torre']

exports.garages = ['VGA', 'VGB']

exports.modes = [
  'mode-no-func',
  'mode-data-edit',
  'mode-data-read',
  'mode-eme-1',
  'mode-eme-2',
  'mode-not-used',
  'mode-step',
  'mode-preset',
  'mode-auto'
]

exports.operations = [
  '---',
  'op-alarm-on',
  'op-alarm-off',
  'op-switch-mode',
  'op-change-pin',
  'op-stall-in',
  'op-stall-out',
  'op-shuffle-in',
  'op-shuffle-out',
  'op-stall-rsv',
  'op-req-exit',
  'op-req-entry',
  '---',
  '---',
  '---',
  '---'
]

exports.positions = ['Laser V1', 'Laser V2', 'Laser H1', 'Laser H2']

exports.inputs1 = [
  { addr: 'E0.0', label: 'A' },
  { addr: 'E0.1', label: 'B' },
  { addr: 'E0.2', label: 'C' },
  { addr: 'E0.3', label: 'D' },
  { addr: 'E0.4', label: 'OK' },
  { addr: 'E0.5', label: 'S2' },
  { addr: 'E0.6', label: 'S2' },
  { addr: 'E0.7', label: 'S2' },
  { addr: 'E1.0', label: 'A' },
  { addr: 'E1.1', label: 'B' },
  { addr: 'E1.2', label: 'C' },
  { addr: 'E1.3', label: 'D' },
  { addr: 'E1.4', label: 'STR' },
  { addr: 'E1.5', label: 'OK' },
  { addr: 'E1.6', label: 'DAT' },
  { addr: 'E1.7', label: 'UC' },
  { addr: 'E2.0', label: 'FE1' },
  { addr: 'E2.1', label: 'SMA' },
  { addr: 'E2.2', label: '' },
  { addr: 'E2.3', label: 'RSI' },
  { addr: 'E2.4', label: '' },
  { addr: 'E2.5', label: 'S1' },
  { addr: 'E2.6', label: 'S1' },
  { addr: 'E2.7', label: 'S1' },
  { addr: 'E3.0', label: '' },
  { addr: 'E3.1', label: '' },
  { addr: 'E3.2', label: '' },
  { addr: 'E3.3', label: '' },
  { addr: 'E3.4', label: 'DB32' },
  { addr: 'E3.5', label: 'DBHZ' },
  { addr: 'E3.6', label: '' },
  { addr: 'E3.7', label: '' }
]
exports.inputs2 = [
  { addr: 'E10.0', label: 'ECA' },
  { addr: 'E10.1', label: 'ECB' },
  { addr: 'E10.2', label: 'AMC' },
  { addr: 'E10.3', label: 'SPR' },
  { addr: 'E10.4', label: 'ADN' },
  { addr: 'E10.5', label: 'AD' },
  { addr: 'E10.6', label: 'ANV' },
  { addr: 'E10.7', label: 'KEXPV' },
  { addr: 'E11.0', label: 'EOM1' },
  { addr: 'E11.1', label: 'EZM1' },
  { addr: 'E11.2', label: 'AMM1' },
  { addr: 'E11.3', label: 'EOM2' },
  { addr: 'E11.4', label: 'EZM2' },
  { addr: 'E11.5', label: 'AMM2' },
  { addr: 'E11.6', label: 'IV1' },
  { addr: 'E11.7', label: 'FTC' },
  { addr: 'E12.0', label: 'MNA' },
  { addr: 'E12.1', label: 'MNB' },
  { addr: 'E12.2', label: 'EXPV' },
  { addr: 'E12.3', label: 'EFB' },
  { addr: 'E12.4', label: 'FRE' },
  { addr: 'E12.5', label: 'IV1' },
  { addr: 'E12.6', label: 'KXPE' },
  { addr: 'E12.7', label: 'KEZ' },
  { addr: 'E13.0', label: 'A' },
  { addr: 'E13.1', label: 'B' },
  { addr: 'E13.2', label: 'C' },
  { addr: 'E13.3', label: 'D' },
  { addr: 'E13.4', label: 'STR' },
  { addr: 'E13.5', label: 'OK' },
  { addr: 'E13.6', label: 'DAT' },
  { addr: 'E13.7', label: 'FE' },
  { addr: 'E14.0', label: 'EZE' },
  { addr: 'E14.1', label: 'EOE' },
  { addr: 'E14.2', label: 'FBE' },
  { addr: 'E14.3', label: 'FPE' },
  { addr: 'E14.4', label: 'FDR' },
  { addr: 'E14.5', label: 'FDL' },
  { addr: 'E14.6', label: 'FTA1' },
  { addr: 'E14.7', label: 'FTA2' },
  { addr: 'E15.0', label: 'FLP' },
  { addr: 'E15.1', label: 'FLA' },
  { addr: 'E15.2', label: 'RX' },
  { addr: 'E15.3', label: 'POD' },
  { addr: 'E15.4', label: 'APE' },
  { addr: 'E15.5', label: 'PRST' },
  { addr: 'E15.6', label: 'FTXV' },
  { addr: 'E15.7', label: 'FTXH' },
  { addr: 'E16.0', label: 'MDR' },
  { addr: 'E16.1', label: 'MDL' },
  { addr: 'E16.2', label: 'EDR' },
  { addr: 'E16.3', label: 'EDL' },
  { addr: 'E16.4', label: '' },
  { addr: 'E16.5', label: '' },
  { addr: 'E16.6', label: '' },
  { addr: 'E16.7', label: '' },
  { addr: 'E17.0', label: '' },
  { addr: 'E17.1', label: '' },
  { addr: 'E17.2', label: '' },
  { addr: 'E17.3', label: '' },
  { addr: 'E17.4', label: '' },
  { addr: 'E17.5', label: '' },
  { addr: 'E17.6', label: '' },
  { addr: 'E17.7', label: '' }
]
exports.inputs3 = [
  { addr: 'E20.0', label: 'EHPAECA' },
  { addr: 'E20.1', label: 'EHPBECB' },
  { addr: 'E20.2', label: 'AMC' },
  { addr: 'E20.3', label: 'ASBKSPR' },
  { addr: 'E20.4', label: 'FSBKADN' },
  { addr: 'E20.5', label: 'RTAAD' },
  { addr: 'E20.6', label: 'FE1ANV' },
  { addr: 'E20.7', label: 'AF7KEXPV' },
  { addr: 'E21.0', label: 'IV1EOM1' },
  { addr: 'E21.1', label: 'IV2EZM1' },
  { addr: 'E21.2', label: 'AMM1' },
  { addr: 'E21.3', label: 'RSIEOM2' },
  { addr: 'E21.4', label: 'EZM2' },
  { addr: 'E21.5', label: 'AHAMM2' },
  { addr: 'E21.6', label: 'AGFIV1' },
  { addr: 'E21.7', label: 'AKKPFTC' },
  { addr: 'E22.0', label: 'MNA' },
  { addr: 'E22.1', label: 'MNB' },
  { addr: 'E22.2', label: 'AEXPV' },
  { addr: 'E22.3', label: 'BEFB' },
  { addr: 'E22.4', label: 'CFRE' },
  { addr: 'E22.5', label: 'DIV1' },
  { addr: 'E22.6', label: 'OKKXPE' },
  { addr: 'E22.7', label: 'S2KEZ' },
  { addr: 'E23.0', label: 'S2A' },
  { addr: 'E23.1', label: 'S2B' },
  { addr: 'E23.2', label: 'EMC' },
  { addr: 'E23.3', label: 'EXPVD' },
  { addr: 'E23.4', label: 'STR' },
  { addr: 'E23.5', label: 'OK' },
  { addr: 'E23.6', label: 'TCRDAT' },
  { addr: 'E23.7', label: 'MTCFE' },
  { addr: 'E24.0', label: 'FTXVEZE' },
  { addr: 'E24.1', label: 'FTXHEOE' },
  { addr: 'E24.2', label: 'RMVFBE' },
  { addr: 'E24.3', label: 'RMHFPE' },
  { addr: 'E24.4', label: 'RESFDR' },
  { addr: 'E24.5', label: 'REHFDL' },
  { addr: 'E24.6', label: 'RCVFTA1' },
  { addr: 'E24.7', label: 'REAVFTA2' },
  { addr: 'E25.0', label: 'REAHFLP' },
  { addr: 'E25.1', label: 'RCHFLA' },
  { addr: 'E25.2', label: 'RX' },
  { addr: 'E25.3', label: 'POD' },
  { addr: 'E25.4', label: 'SRLAPE' },
  { addr: 'E25.5', label: 'PRST' },
  { addr: 'E25.6', label: 'DB32FTXV' },
  { addr: 'E25.7', label: 'DBHZFTXH' },
  { addr: 'E26.0', label: 'MDR' },
  { addr: 'E26.1', label: 'MUCDL' },
  { addr: 'E26.2', label: 'EDR' },
  { addr: 'E26.3', label: 'EDL' },
  { addr: 'E26.4', label: '' },
  { addr: 'E26.5', label: '' },
  { addr: 'E26.6', label: '' },
  { addr: 'E26.7', label: '' },
  { addr: 'E27.0', label: '' },
  { addr: 'E27.1', label: '' },
  { addr: 'E27.2', label: '' },
  { addr: 'E27.3', label: '' },
  { addr: 'E27.4', label: '' },
  { addr: 'E27.5', label: '' },
  { addr: 'E27.6', label: '' },
  { addr: 'E27.7', label: '' }
]
exports.inputs4 = [
  { addr: 'E30.0', label: 'EHPA' },
  { addr: 'E30.1', label: 'EHPB' },
  { addr: 'E30.2', label: '' },
  { addr: 'E30.3', label: 'ASBK' },
  { addr: 'E30.4', label: 'FSBK' },
  { addr: 'E30.5', label: 'RTA' },
  { addr: 'E30.6', label: 'FE1' },
  { addr: 'E30.7', label: 'AF7' },
  { addr: 'E31.0', label: 'IV1' },
  { addr: 'E31.1', label: 'IV2' },
  { addr: 'E31.2', label: '' },
  { addr: 'E31.3', label: 'RSI' },
  { addr: 'E31.4', label: '' },
  { addr: 'E31.5', label: 'AH' },
  { addr: 'E31.6', label: 'AGF' },
  { addr: 'E31.7', label: 'AKKP' }
]
exports.inputs5 = [
  { addr: 'E40.0', label: 'A' },
  { addr: 'E40.1', label: 'B' },
  { addr: 'E40.2', label: 'C' },
  { addr: 'E40.3', label: 'D' },
  { addr: 'E40.4', label: 'OK' },
  { addr: 'E40.5', label: 'S2' },
  { addr: 'E40.6', label: 'S2' },
  { addr: 'E40.7', label: 'S2' },
  { addr: 'E41.0', label: 'EM' },
  { addr: 'E41.1', label: 'EXPV' },
  { addr: 'E41.2', label: '' },
  { addr: 'E41.3', label: '' },
  { addr: 'E41.4', label: 'TCR' },
  { addr: 'E41.5', label: 'MTC' },
  { addr: 'E41.6', label: 'FTXV' },
  { addr: 'E41.7', label: 'FTXH' },
  { addr: 'E42.0', label: 'RMV' },
  { addr: 'E42.1', label: 'RMH' },
  { addr: 'E42.2', label: 'RES' },
  { addr: 'E42.3', label: 'REH' },
  { addr: 'E42.4', label: 'RCV' },
  { addr: 'E42.5', label: 'REAV' },
  { addr: 'E42.6', label: 'REAH' },
  { addr: 'E42.7', label: 'RCH' },
  { addr: 'E43.0', label: '' },
  { addr: 'E43.1', label: '' },
  { addr: 'E43.2', label: 'SRL' },
  { addr: 'E43.3', label: '' },
  { addr: 'E43.4', label: 'DB32' },
  { addr: 'E43.5', label: 'DBHZ' },
  { addr: 'E43.6', label: '' },
  { addr: 'E43.7', label: 'UC' }
]
exports.outputs1 = [
  { addr: 'A0.0', label: 'A' },
  { addr: 'A0.1', label: 'B' },
  { addr: 'A0.2', label: 'C' },
  { addr: 'A0.3', label: 'D' },
  { addr: 'A0.4', label: 'AD1' },
  { addr: 'A0.5', label: 'AD2' },
  { addr: 'A0.6', label: 'AD3' },
  { addr: 'A0.7', label: 'STR' },
  { addr: 'A1.0', label: 'LK' },
  { addr: 'A1.1', label: 'LE' },
  { addr: 'A1.2', label: 'LB' },
  { addr: 'A1.3', label: 'RDY' },
  { addr: 'A1.4', label: 'RST' },
  { addr: 'A1.5', label: 'RBU' },
  { addr: 'A1.6', label: 'LA' },
  { addr: 'A1.7', label: 'LC' }
]
exports.outputs2 = [
  { addr: 'A10.0', label: 'KEM' },
  { addr: 'A10.1', label: 'KBA' },
  { addr: 'A10.2', label: 'KXPE' },
  { addr: 'A10.3', label: 'SQA' },
  { addr: 'A10.4', label: 'TD' },
  { addr: 'A10.5', label: '' },
  { addr: 'A10.6', label: '' },
  { addr: 'A10.7', label: '' },
  { addr: 'A11.0', label: 'L1' },
  { addr: 'A11.1', label: 'L2' },
  { addr: 'A11.2', label: 'L3' },
  { addr: 'A11.3', label: 'L4' },
  { addr: 'A11.4', label: 'L5' },
  { addr: 'A11.5', label: 'RFE' },
  { addr: 'A11.6', label: 'RLN' },
  { addr: 'A11.7', label: 'RBE' },
  { addr: 'A12.0', label: 'SCA' },
  { addr: 'A12.1', label: 'SCB' },
  { addr: 'A12.2', label: 'SMA1' },
  { addr: 'A12.3', label: 'SMB1' },
  { addr: 'A12.4', label: 'SMA2' },
  { addr: 'A12.5', label: 'SMB2' },
  { addr: 'A12.6', label: '' },
  { addr: 'A12.7', label: 'LC' },
  { addr: 'A13.0', label: 'LK' },
  { addr: 'A13.1', label: 'LE' },
  { addr: 'A13.2', label: 'LB' },
  { addr: 'A13.3', label: 'RDY' },
  { addr: 'A13.4', label: 'RST' },
  { addr: 'A13.5', label: 'SDR' },
  { addr: 'A13.6', label: 'SDL' },
  { addr: 'A13.7', label: 'SDN' },
  { addr: 'A14.0', label: '' },
  { addr: 'A14.1', label: '' },
  { addr: 'A14.2', label: '' },
  { addr: 'A14.3', label: '' },
  { addr: 'A14.4', label: '' },
  { addr: 'A14.5', label: '' },
  { addr: 'A14.6', label: '' },
  { addr: 'A14.7', label: '' },
  { addr: 'A15.0', label: '' },
  { addr: 'A15.1', label: '' },
  { addr: 'A15.2', label: '' },
  { addr: 'A15.3', label: '' },
  { addr: 'A15.4', label: '' },
  { addr: 'A15.5', label: 'SNA' },
  { addr: 'A15.6', label: 'SNB' },
  { addr: 'A15.7', label: 'SNV' }
]
exports.outputs3 = [
  { addr: 'A20.0', label: 'KEM' },
  { addr: 'A20.1', label: 'KBA' },
  { addr: 'A20.2', label: 'KXPE' },
  { addr: 'A20.3', label: 'SQA' },
  { addr: 'A20.4', label: 'TD' },
  { addr: 'A20.5', label: '' },
  { addr: 'A20.6', label: '' },
  { addr: 'A20.7', label: '' },
  { addr: 'A21.0', label: 'L1' },
  { addr: 'A21.1', label: 'L2' },
  { addr: 'A21.2', label: 'L3' },
  { addr: 'A21.3', label: 'L4' },
  { addr: 'A21.4', label: 'L5' },
  { addr: 'A21.5', label: 'RFE' },
  { addr: 'A21.6', label: 'RLN' },
  { addr: 'A21.7', label: 'RBE' },
  { addr: 'A22.0', label: 'SCA' },
  { addr: 'A22.1', label: 'SCB' },
  { addr: 'A22.2', label: 'SMA1' },
  { addr: 'A22.3', label: 'SMB1' },
  { addr: 'A22.4', label: 'SMA2' },
  { addr: 'A22.5', label: 'SMB2' },
  { addr: 'A22.6', label: '' },
  { addr: 'A22.7', label: 'LC' },
  { addr: 'A23.0', label: 'LK' },
  { addr: 'A23.1', label: 'LE' },
  { addr: 'A23.2', label: 'LB' },
  { addr: 'A23.3', label: 'RDY' },
  { addr: 'A23.4', label: 'RST' },
  { addr: 'A23.5', label: 'SDR' },
  { addr: 'A23.6', label: 'SDL' },
  { addr: 'A23.7', label: 'SDN' },
  { addr: 'A24.0', label: '' },
  { addr: 'A24.1', label: '' },
  { addr: 'A24.2', label: '' },
  { addr: 'A24.3', label: '' },
  { addr: 'A24.4', label: '' },
  { addr: 'A24.5', label: '' },
  { addr: 'A24.6', label: '' },
  { addr: 'A24.7', label: '' },
  { addr: 'A25.0', label: '' },
  { addr: 'A25.1', label: '' },
  { addr: 'A25.2', label: '' },
  { addr: 'A25.3', label: '' },
  { addr: 'A25.4', label: '' },
  { addr: 'A25.5', label: 'SNA' },
  { addr: 'A25.6', label: 'SNB' },
  { addr: 'A25.7', label: 'SNV' }
]
exports.outputs4 = [
  { addr: 'A30.0', label: 'SBK1' },
  { addr: 'A30.1', label: '' },
  { addr: 'A30.2', label: '' },
  { addr: 'A30.3', label: '' },
  { addr: 'A30.4', label: '' },
  { addr: 'A30.5', label: '' },
  { addr: 'A30.6', label: '' },
  { addr: 'A30.7', label: '' },
  { addr: 'A31.0', label: 'T101' },
  { addr: 'A31.1', label: 'T2' },
  { addr: 'A31.2', label: 'T10F' },
  { addr: 'A31.3', label: 'T102' },
  { addr: 'A31.4', label: 'KBA1' },
  { addr: 'A31.5', label: 'KBA2' },
  { addr: 'A31.6', label: 'SBK2' },
  { addr: 'A31.7', label: '' }
]
exports.outputs5 = [
  { addr: 'A40.0', label: 'A' },
  { addr: 'A40.1', label: 'B' },
  { addr: 'A40.2', label: 'C' },
  { addr: 'A40.3', label: 'D' },
  { addr: 'A40.4', label: 'AD1' },
  { addr: 'A40.5', label: 'AD2' },
  { addr: 'A40.6', label: 'AD3' },
  { addr: 'A40.7', label: 'STR' },
  { addr: 'A41.0', label: '' },
  { addr: 'A41.1', label: '' },
  { addr: 'A41.2', label: 'TRA' },
  { addr: 'A41.3', label: 'TRB' },
  { addr: 'A41.4', label: 'KCS' },
  { addr: 'A41.5', label: 'KCV' },
  { addr: 'A41.6', label: 'KCH' },
  { addr: 'A41.7', label: 'TCR' },
  { addr: 'A42.0', label: '' },
  { addr: 'A42.1', label: '' },
  { addr: 'A42.2', label: '' },
  { addr: 'A42.3', label: '' },
  { addr: 'A42.4', label: '' },
  { addr: 'A42.5', label: '' },
  { addr: 'A42.6', label: 'LA' },
  { addr: 'A42.7', label: 'LC' }
]
exports.merkers1 = [
  { addr: 'M0.0', label: '' },
  { addr: 'M0.1', label: '' },
  { addr: 'M0.2', label: '' },
  { addr: 'M0.3', label: '' },
  { addr: 'M0.4', label: '' },
  { addr: 'M0.5', label: '' },
  { addr: 'M0.6', label: '' },
  { addr: 'M0.7', label: '' },
  { addr: 'M1.0', label: '' },
  { addr: 'M1.1', label: '' },
  { addr: 'M1.2', label: '' },
  { addr: 'M1.3', label: '' },
  { addr: 'M1.4', label: '' },
  { addr: 'M1.5', label: '' },
  { addr: 'M1.6', label: '' },
  { addr: 'M1.7', label: '' },
  { addr: 'M2.0', label: '' },
  { addr: 'M2.1', label: '' },
  { addr: 'M2.2', label: '' },
  { addr: 'M2.3', label: '' },
  { addr: 'M2.4', label: '' },
  { addr: 'M2.5', label: '' },
  { addr: 'M2.6', label: '' },
  { addr: 'M2.7', label: '' },
  { addr: 'M3.0', label: '' },
  { addr: 'M3.1', label: '' },
  { addr: 'M3.2', label: '' },
  { addr: 'M3.3', label: '' },
  { addr: 'M3.4', label: '' },
  { addr: 'M3.5', label: '' },
  { addr: 'M3.6', label: '' },
  { addr: 'M3.7', label: '' },
  { addr: 'M4.0', label: '' },
  { addr: 'M4.1', label: '' },
  { addr: 'M4.2', label: '' },
  { addr: 'M4.3', label: '' },
  { addr: 'M4.4', label: '' },
  { addr: 'M4.5', label: '' },
  { addr: 'M4.6', label: '' },
  { addr: 'M4.7', label: '' },
  { addr: 'M5.0', label: '' },
  { addr: 'M5.1', label: '' },
  { addr: 'M5.2', label: '' },
  { addr: 'M5.3', label: '' },
  { addr: 'M5.4', label: '' },
  { addr: 'M5.5', label: '' },
  { addr: 'M5.6', label: '' },
  { addr: 'M5.7', label: '' },
  { addr: 'M6.0', label: '' },
  { addr: 'M6.1', label: '' },
  { addr: 'M6.2', label: '' },
  { addr: 'M6.3', label: '' },
  { addr: 'M6.4', label: '' },
  { addr: 'M6.5', label: '' },
  { addr: 'M6.6', label: '' },
  { addr: 'M6.7', label: '' },
  { addr: 'M7.0', label: '' },
  { addr: 'M7.1', label: '' },
  { addr: 'M7.2', label: '' },
  { addr: 'M7.3', label: '' },
  { addr: 'M7.4', label: '' },
  { addr: 'M7.5', label: '' },
  { addr: 'M7.6', label: '' },
  { addr: 'M7.7', label: '' }
]
exports.alarms1 = [
  { class: 'ELA', label: 'AL1' },
  { class: 'ELA', label: 'AL2' },
  { class: 'ELA', label: 'AL3' },
  { class: 'ELA', label: 'AL4' },
  { class: 'ELA', label: 'AL5' },
  { class: 'ELA', label: 'AL6' },
  { class: 'ELA', label: 'AL7' },
  { class: 'ELA', label: 'AL8' },
  { class: 'ELA', label: 'AL9' },
  { class: 'ELA', label: 'AL10' },
  { class: 'ELA', label: 'AL11' },
  { class: 'ELA', label: 'AL12' },
  { class: 'ELA', label: 'AL13' },
  { class: 'ELA', label: 'AL14' },
  { class: 'ELA', label: 'AL15' },
  { class: 'ELA', label: 'AL16' },
  { class: 'ELA', label: 'AL17' },
  { class: 'ELA', label: 'AL18' },
  { class: 'ELA', label: 'AL19' },
  { class: 'ELA', label: 'AL20' },
  { class: 'ELA', label: 'AL21' },
  { class: 'ELA', label: 'AL22' },
  { class: 'ELA', label: 'AL23' },
  { class: 'ELA', label: 'AL24' },
  { class: 'ELA', label: 'AL25' },
  { class: 'ELA', label: 'AL26' },
  { class: 'ELA', label: 'AL27' },
  { class: 'ELA', label: 'AL28' },
  { class: 'ELA', label: 'AL29' },
  { class: 'ELA', label: 'AL30' },
  { class: 'ELA', label: 'AL31' },
  { class: 'ELA', label: 'AL32' },
  { class: 'ELA', label: 'AL33' },
  { class: 'ELA', label: 'AL34' },
  { class: 'ELA', label: 'AL35' },
  { class: 'ELA', label: 'AL36' },
  { class: 'ELA', label: 'AL37' },
  { class: 'ELA', label: 'AL38' },
  { class: 'ELA', label: 'AL39' },
  { class: 'ELA', label: 'AL40' },
  { class: 'ELA', label: 'AL41' },
  { class: 'ELA', label: 'AL42' },
  { class: 'ELA', label: 'AL43' },
  { class: 'ELA', label: 'AL44' },
  { class: 'ELA', label: 'AL45' },
  { class: 'ELA', label: 'AL46' },
  { class: 'ELA', label: 'AL47' },
  { class: 'ELA', label: 'AL48' },
  { class: 'ELA', label: 'AL49' },
  { class: 'ELA', label: 'AL50' },
  { class: 'ELA', label: 'AL51' },
  { class: 'ELA', label: 'AL52' },
  { class: 'ELA', label: 'AL53' },
  { class: 'ELA', label: 'AL54' },
  { class: 'ELA', label: 'AL55' },
  { class: 'ELA', label: 'AL56' },
  { class: 'ELA', label: 'AL57' },
  { class: 'ELA', label: 'AL58' },
  { class: 'ELA', label: 'AL59' },
  { class: 'ELA', label: 'AL60' },
  { class: 'ELA', label: 'AL61' },
  { class: 'ELA', label: 'AL62' },
  { class: 'ELA', label: 'AL63' },
  { class: 'ELA', label: 'AL64' }
]
exports.alarms2 = [
  { class: 'ELB', label: 'AL1' },
  { class: 'ELB', label: 'AL2' },
  { class: 'ELB', label: 'AL3' },
  { class: 'ELB', label: 'AL4' },
  { class: 'ELB', label: 'AL5' },
  { class: 'ELB', label: 'AL6' },
  { class: 'ELB', label: 'AL7' },
  { class: 'ELB', label: 'AL8' },
  { class: 'ELB', label: 'AL9' },
  { class: 'ELB', label: 'AL10' },
  { class: 'ELB', label: 'AL11' },
  { class: 'ELB', label: 'AL12' },
  { class: 'ELB', label: 'AL13' },
  { class: 'ELB', label: 'AL14' },
  { class: 'ELB', label: 'AL15' },
  { class: 'ELB', label: 'AL16' },
  { class: 'ELB', label: 'AL17' },
  { class: 'ELB', label: 'AL18' },
  { class: 'ELB', label: 'AL19' },
  { class: 'ELB', label: 'AL20' },
  { class: 'ELB', label: 'AL21' },
  { class: 'ELB', label: 'AL22' },
  { class: 'ELB', label: 'AL23' },
  { class: 'ELB', label: 'AL24' },
  { class: 'ELB', label: 'AL25' },
  { class: 'ELB', label: 'AL26' },
  { class: 'ELB', label: 'AL27' },
  { class: 'ELB', label: 'AL28' },
  { class: 'ELB', label: 'AL29' },
  { class: 'ELB', label: 'AL30' },
  { class: 'ELB', label: 'AL31' },
  { class: 'ELB', label: 'AL32' },
  { class: 'ELB', label: 'AL33' },
  { class: 'ELB', label: 'AL34' },
  { class: 'ELB', label: 'AL35' },
  { class: 'ELB', label: 'AL36' },
  { class: 'ELB', label: 'AL37' },
  { class: 'ELB', label: 'AL38' },
  { class: 'ELB', label: 'AL39' },
  { class: 'ELB', label: 'AL40' },
  { class: 'ELB', label: 'AL41' },
  { class: 'ELB', label: 'AL42' },
  { class: 'ELB', label: 'AL43' },
  { class: 'ELB', label: 'AL44' },
  { class: 'ELB', label: 'AL45' },
  { class: 'ELB', label: 'AL46' },
  { class: 'ELB', label: 'AL47' },
  { class: 'ELB', label: 'AL48' },
  { class: 'ELB', label: 'AL49' },
  { class: 'ELB', label: 'AL50' },
  { class: 'ELB', label: 'AL51' },
  { class: 'ELB', label: 'AL52' },
  { class: 'ELB', label: 'AL53' },
  { class: 'ELB', label: 'AL54' },
  { class: 'ELB', label: 'AL55' },
  { class: 'ELB', label: 'AL56' },
  { class: 'ELB', label: 'AL57' },
  { class: 'ELB', label: 'AL58' },
  { class: 'ELB', label: 'AL59' },
  { class: 'ELB', label: 'AL60' },
  { class: 'ELB', label: 'AL61' },
  { class: 'ELB', label: 'AL62' },
  { class: 'ELB', label: 'AL63' },
  { class: 'ELB', label: 'AL64' }
]
exports.alarms3 = [
  { class: 'TT', label: 'AL1' },
  { class: 'TT', label: 'AL2' },
  { class: 'TT', label: 'AL3' },
  { class: 'TT', label: 'AL4' },
  { class: 'TT', label: 'AL5' },
  { class: 'TT', label: 'AL6' },
  { class: 'TT', label: 'AL7' },
  { class: 'TT', label: 'AL8' },
  { class: 'TT', label: 'AL9' },
  { class: 'TT', label: 'AL10' },
  { class: 'TT', label: 'AL11' },
  { class: 'TT', label: 'AL12' },
  { class: 'TT', label: 'AL13' },
  { class: 'TT', label: 'AL14' },
  { class: 'TT', label: 'AL15' },
  { class: 'TT', label: 'AL16' },
  { class: 'TT', label: 'AL17' },
  { class: 'TT', label: 'AL18' },
  { class: 'TT', label: 'AL19' },
  { class: 'TT', label: 'AL20' },
  { class: 'TT', label: 'AL21' },
  { class: 'TT', label: 'AL22' },
  { class: 'TT', label: 'AL23' },
  { class: 'TT', label: 'AL24' },
  { class: 'TT', label: 'AL25' },
  { class: 'TT', label: 'AL26' },
  { class: 'TT', label: 'AL27' },
  { class: 'TT', label: 'AL28' },
  { class: 'TT', label: 'AL29' },
  { class: 'TT', label: 'AL30' },
  { class: 'TT', label: 'AL31' },
  { class: 'TT', label: 'AL32' },
  { class: 'TT', label: 'AL33' },
  { class: 'TT', label: 'AL34' },
  { class: 'TT', label: 'AL35' },
  { class: 'TT', label: 'AL36' },
  { class: 'TT', label: 'AL37' },
  { class: 'TT', label: 'AL38' },
  { class: 'TT', label: 'AL39' },
  { class: 'TT', label: 'AL40' },
  { class: 'TT', label: 'AL41' },
  { class: 'TT', label: 'AL42' },
  { class: 'TT', label: 'AL43' },
  { class: 'TT', label: 'AL44' },
  { class: 'TT', label: 'AL45' },
  { class: 'TT', label: 'AL46' },
  { class: 'TT', label: 'AL47' },
  { class: 'TT', label: 'AL48' },
  { class: 'TT', label: 'AL49' },
  { class: 'TT', label: 'AL50' },
  { class: 'TT', label: 'AL51' },
  { class: 'TT', label: 'AL52' },
  { class: 'TT', label: 'AL53' },
  { class: 'TT', label: 'AL54' },
  { class: 'TT', label: 'AL55' },
  { class: 'TT', label: 'AL56' },
  { class: 'TT', label: 'AL57' },
  { class: 'TT', label: 'AL58' },
  { class: 'TT', label: 'AL59' },
  { class: 'TT', label: 'AL60' },
  { class: 'TT', label: 'AL61' },
  { class: 'TT', label: 'AL62' },
  { class: 'TT', label: 'AL63' },
  { class: 'TT', label: 'AL64' }
]
