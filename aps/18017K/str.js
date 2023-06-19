// generate I/O
exports.inputs1 = [
  { addr: 'E0.0', label: 'A' },
  { addr: 'E0.1', label: 'B' },
  { addr: 'E0.2', label: 'C' },
  { addr: 'E0.3', label: 'D' },
  { addr: 'E0.4', label: 'OK' },
  { addr: 'E0.5', label: 'S2' },
  { addr: 'E0.6', label: 'S2' },
  { addr: 'E0.7', label: 'S2' },
  { addr: 'E1.0', label: 'SA' },
  { addr: 'E1.1', label: '' },
  { addr: 'E1.2', label: '' },
  { addr: 'E1.3', label: 'RS3' },
  { addr: 'E1.4', label: 'RS12' },
  { addr: 'E1.5', label: 'DB32' },
  { addr: 'E1.6', label: 'DBHZ' },
  { addr: 'E1.7', label: 'UC' },
  { addr: 'E2.0', label: 'IV1' },
  { addr: 'E2.1', label: 'IV2' },
  { addr: 'E2.2', label: 'RTA' },
  { addr: 'E2.3', label: 'AIV2' },
  { addr: 'E2.4', label: 'AF8' },
  { addr: 'E2.5', label: 'AKKP' },
  { addr: 'E2.6', label: 'FSBK' },
  { addr: 'E2.7', label: 'ASBK' },
  { addr: 'E3.0', label: 'AMC1' },
  { addr: 'E3.1', label: 'AMC2' },
  { addr: 'E3.2', label: 'APE1' },
  { addr: 'E3.3', label: 'APBE1' },
  { addr: 'E3.4', label: 'APE2' },
  { addr: 'E3.5', label: 'APBE2' },
  { addr: 'E3.6', label: '' },
  { addr: 'E3.7', label: 'FE12' },
  { addr: 'E4.0', label: 'EZE-1' },
  { addr: 'E4.1', label: 'EOE-1' },
  { addr: 'E4.2', label: 'FBE-1' },
  { addr: 'E4.3', label: 'FPE-1' },
  { addr: 'E4.4', label: 'FDR1-1' },
  { addr: 'E4.5', label: 'FDL1-1' },
  { addr: 'E4.6', label: 'FTA1-1' },
  { addr: 'E4.7', label: 'FTA2-1' },
  { addr: 'E5.0', label: 'FLP1-1' },
  { addr: 'E5.1', label: '' },
  { addr: 'E5.2', label: 'FLA1-1' },
  { addr: 'E5.3', label: 'POD-1' },
  { addr: 'E5.4', label: '' },
  { addr: 'E5.5', label: 'RX1-1' },
  { addr: 'E5.6', label: 'RX2-1' },
  { addr: 'E5.7', label: '' },
  { addr: 'E6.0', label: 'EZE-2' },
  { addr: 'E6.1', label: 'EOE-2' },
  { addr: 'E6.2', label: 'FBE-2' },
  { addr: 'E6.3', label: 'FPE-2' },
  { addr: 'E6.4', label: 'FDR1-2' },
  { addr: 'E6.5', label: 'FDL1-2' },
  { addr: 'E6.6', label: 'FTA1-2' },
  { addr: 'E6.7', label: 'FTA2-2' },
  { addr: 'E7.0', label: 'FLP1-2' },
  { addr: 'E7.1', label: '' },
  { addr: 'E7.2', label: 'FLA1-2' },
  { addr: 'E7.3', label: 'POD-2' },
  { addr: 'E7.4', label: '' },
  { addr: 'E7.5', label: 'RX1-2' },
  { addr: 'E7.6', label: 'RX2-2' },
  { addr: 'E7.7', label: '' },
  { addr: 'E8.0', label: 'EXZE-1' },
  { addr: 'E8.1', label: 'EXBZE-1' },
  { addr: 'E8.2', label: 'EBZE-1' },
  { addr: 'E8.3', label: 'EBOE-1' },
  { addr: 'E8.4', label: 'FBBE-1' },
  { addr: 'E8.5', label: 'ECA-1' },
  { addr: 'E8.6', label: 'ECB-1' },
  { addr: 'E8.7', label: 'FRE-1' },
  { addr: 'E9.0', label: 'EXZE-2' },
  { addr: 'E9.1', label: 'EXBZE-2' },
  { addr: 'E9.2', label: 'EBZE-2' },
  { addr: 'E9.3', label: 'EBOE-2' },
  { addr: 'E9.4', label: 'FBBE-2' },
  { addr: 'E9.5', label: 'ECA-2' },
  { addr: 'E9.6', label: 'ECB-2' },
  { addr: 'E9.7', label: 'FRE-2' },
  { addr: 'E10.0', label: 'BA-1' },
  { addr: 'E10.1', label: 'BB-1' },
  { addr: 'E10.2', label: 'BC-1' },
  { addr: 'E10.3', label: 'BD-1' },
  { addr: 'E10.4', label: 'BSTR' },
  { addr: 'E10.5', label: 'BOK-1' },
  { addr: 'E10.6', label: 'BDAT' },
  { addr: 'E10.7', label: '' },
  { addr: 'E11.0', label: 'BA-2' },
  { addr: 'E11.1', label: 'BB-2' },
  { addr: 'E11.2', label: 'BC-2' },
  { addr: 'E11.3', label: 'BD-2' },
  { addr: 'E11.4', label: 'BSTR' },
  { addr: 'E11.5', label: 'BOK-2' },
  { addr: 'E11.6', label: 'BDAT' },
  { addr: 'E11.7', label: '' },
  { addr: 'E12.0', label: 'A' },
  { addr: 'E12.1', label: 'B' },
  { addr: 'E12.2', label: 'C' },
  { addr: 'E12.3', label: 'D' },
  { addr: 'E12.4', label: 'OK' },
  { addr: 'E12.5', label: 'S2' },
  { addr: 'E12.6', label: 'S2' },
  { addr: 'E12.7', label: 'S2' },
  { addr: 'E13.0', label: 'SRL' },
  { addr: 'E13.1', label: 'AMM' },
  { addr: 'E13.2', label: 'FTCR1' },
  { addr: 'E13.3', label: 'FTCR2' },
  { addr: 'E13.4', label: 'ACR' },
  { addr: 'E13.5', label: '' },
  { addr: 'E13.6', label: 'FE3' },
  { addr: 'E13.7', label: 'UC' },
  { addr: 'E14.0', label: 'EOM' },
  { addr: 'E14.1', label: 'EZM' },
  { addr: 'E14.2', label: 'EMC' },
  { addr: 'E14.3', label: 'EXV' },
  { addr: 'E14.4', label: '' },
  { addr: 'E14.5', label: '' },
  { addr: 'E14.6', label: '' },
  { addr: 'E14.7', label: 'EHP' },
  { addr: 'E15.0', label: 'EXD' },
  { addr: 'E15.1', label: 'EM' },
  { addr: 'E15.2', label: 'FTXV' },
  { addr: 'E15.3', label: 'FTXH' },
  { addr: 'E15.4', label: 'FTV1' },
  { addr: 'E15.5', label: 'FTH1' },
  { addr: 'E15.6', label: 'FTV2' },
  { addr: 'E15.7', label: 'FTH2' },
  { addr: 'E16.0', label: 'ASBK2' },
  { addr: 'E16.1', label: 'AH' },
  { addr: 'E16.2', label: 'AD' },
  { addr: 'E16.3', label: '' },
  { addr: 'E16.4', label: 'MTC' },
  { addr: 'E16.5', label: '' },
  { addr: 'E16.6', label: '' },
  { addr: 'E16.7', label: '' },
  { addr: 'E17.0', label: 'RMV' },
  { addr: 'E17.1', label: 'RMH' },
  { addr: 'E17.2', label: 'RES' },
  { addr: 'E17.3', label: 'REH' },
  { addr: 'E17.4', label: 'RCV' },
  { addr: 'E17.5', label: 'REAV' },
  { addr: 'E17.6', label: 'REAH' },
  { addr: 'E17.7', label: 'RCH' }
]
exports.outputs1 = [
  { addr: 'A0.0', label: 'DYA' },
  { addr: 'A0.1', label: 'DYB' },
  { addr: 'A0.2', label: 'DYC' },
  { addr: 'A0.3', label: 'DYD' },
  { addr: 'A0.4', label: 'AD1' },
  { addr: 'A0.5', label: 'AD2' },
  { addr: 'A0.6', label: 'AD3' },
  { addr: 'A0.7', label: 'STR' },
  { addr: 'A1.0', label: 'KBA1-1' },
  { addr: 'A1.1', label: 'KBA1-2' },
  { addr: 'A1.2', label: '' },
  { addr: 'A1.3', label: '' },
  { addr: 'A1.4', label: '' },
  { addr: 'A1.5', label: 'LS' },
  { addr: 'A1.6', label: 'LA' },
  { addr: 'A1.7', label: 'LC' },
  { addr: 'A2.0', label: 'L1' },
  { addr: 'A2.1', label: 'L2' },
  { addr: 'A2.2', label: 'L3' },
  { addr: 'A2.3', label: 'L4' },
  { addr: 'A2.4', label: 'L5' },
  { addr: 'A2.5', label: 'RFE' },
  { addr: 'A2.6', label: 'RLN' },
  { addr: 'A2.7', label: 'RBE' },
  { addr: 'A3.0', label: 'LK' },
  { addr: 'A3.1', label: 'LE' },
  { addr: 'A3.2', label: 'LB' },
  { addr: 'A3.3', label: 'RDY' },
  { addr: 'A3.4', label: 'RST' },
  { addr: 'A3.5', label: '' },
  { addr: 'A3.6', label: '' },
  { addr: 'A3.7', label: '' },
  { addr: 'A4.0', label: 'L1' },
  { addr: 'A4.1', label: 'L2' },
  { addr: 'A4.2', label: 'L3' },
  { addr: 'A4.3', label: 'L4' },
  { addr: 'A4.4', label: 'L5' },
  { addr: 'A4.5', label: 'RFE' },
  { addr: 'A4.6', label: 'RLN' },
  { addr: 'A4.7', label: 'RBE' },
  { addr: 'A5.0', label: 'LK' },
  { addr: 'A5.1', label: 'LE' },
  { addr: 'A5.2', label: 'LB' },
  { addr: 'A5.3', label: 'RDY' },
  { addr: 'A5.4', label: 'RST' },
  { addr: 'A5.5', label: '' },
  { addr: 'A5.6', label: '' },
  { addr: 'A5.7', label: '' },
  { addr: 'A6.0', label: 'KBA2-1' },
  { addr: 'A6.1', label: 'KBA2-2' },
  { addr: 'A6.2', label: '' },
  { addr: 'A6.3', label: '' },
  { addr: 'A6.4', label: '' },
  { addr: 'A6.5', label: 'TLIV' },
  { addr: 'A6.6', label: '' },
  { addr: 'A6.7', label: 'SBK1' },
  { addr: 'A7.0', label: '' },
  { addr: 'A7.1', label: '' },
  { addr: 'A7.2', label: 'SCA1' },
  { addr: 'A7.3', label: 'SCB1' },
  { addr: 'A7.4', label: 'SCA2' },
  { addr: 'A7.5', label: 'SCB2' },
  { addr: 'A7.6', label: '' },
  { addr: 'A7.7', label: 'SBK2' },
  { addr: 'A8.0', label: 'SPE1' },
  { addr: 'A8.1', label: 'SZE1' },
  { addr: 'A8.2', label: 'SOE1' },
  { addr: 'A8.3', label: 'KXPE' },
  { addr: 'A8.4', label: 'SBP1' },
  { addr: 'A8.5', label: 'SBZE1' },
  { addr: 'A8.6', label: 'SBOE1' },
  { addr: 'A8.7', label: 'KXBP1' },
  { addr: 'A9.0', label: 'SPE2' },
  { addr: 'A9.1', label: 'SZE2' },
  { addr: 'A9.2', label: 'SOE2' },
  { addr: 'A9.3', label: 'KXPE' },
  { addr: 'A9.4', label: 'SBP2' },
  { addr: 'A9.5', label: 'SBZE2' },
  { addr: 'A9.6', label: 'SBOE2' },
  { addr: 'A9.7', label: 'KXBP2' },
  { addr: 'A10.0', label: 'DYA' },
  { addr: 'A10.1', label: 'DYB' },
  { addr: 'A10.2', label: 'DYC' },
  { addr: 'A10.3', label: 'DYD' },
  { addr: 'A10.4', label: 'AD1' },
  { addr: 'A10.5', label: 'AD2' },
  { addr: 'A10.6', label: 'AD3' },
  { addr: 'A10.7', label: 'STR' },
  { addr: 'A11.0', label: 'SMA' },
  { addr: 'A11.1', label: 'SMB' },
  { addr: 'A11.2', label: 'TCR1' },
  { addr: 'A11.3', label: 'TCR2' },
  { addr: 'A11.4', label: '' },
  { addr: 'A11.5', label: '' },
  { addr: 'A11.6', label: 'LA' },
  { addr: 'A11.7', label: 'LC' },
  { addr: 'A12.0', label: 'T10' },
  { addr: 'A12.1', label: 'TD' },
  { addr: 'A12.2', label: 'T2' },
  { addr: 'A12.3', label: 'TRA' },
  { addr: 'A12.4', label: 'TRB' },
  { addr: 'A12.5', label: 'KCS' },
  { addr: 'A12.6', label: 'KCV' },
  { addr: 'A12.7', label: 'KCH' },
  { addr: 'A13.0', label: '' },
  { addr: 'A13.1', label: '' },
  { addr: 'A13.2', label: '' },
  { addr: 'A13.3', label: '' },
  { addr: 'A13.4', label: '' },
  { addr: 'A13.5', label: '' },
  { addr: 'A13.6', label: '' },
  { addr: 'A13.7', label: '' }
]
exports.ALARMS = [
  { id: 1, key: 'al-to', query: { motor: 'mot-flap', numMotor: 1 } },
  { id: 2, key: 'al-fc', query: { motor: 'mot-flap', numMotor: 1, name1: 'ECA', name2: 'ECB' } },
  { id: 3, key: 'al-th', query: { motor: 'mot-flap', name: 'AMC' } },
  { id: 4, key: '', query: {} },
  { id: 5, key: '', query: {} },
  { id: 6, key: '', query: {} },
  { id: 7, key: '', query: {} },
  { id: 8, key: '', query: {} },
  { id: 9, key: '', query: {} },
  { id: 10, key: '', query: {} },
  { id: 11, key: '', query: {} },
  { id: 12, key: '', query: {} },
  { id: 13, key: '', query: {} },
  { id: 14, key: '', query: {} },
  { id: 15, key: '', query: {} },
  { id: 16, key: 'al-sil-16', query: {} },
  { id: 17, key: 'al-flap-to', query: {} },
  { id: 18, key: 'al-flap-fc', query: {} },
  { id: 19, key: 'al-sp-to', query: {} },
  { id: 20, key: 'al-sp-fc', query: {} },
  { id: 21, key: 'al-spb-to', query: {} },
  { id: 22, key: 'al-spb-fc', query: {} },
  { id: 23, key: '', query: {} },
  { id: 24, key: '', query: {} },
  { id: 25, key: '', query: {} },
  { id: 26, key: '', query: {} },
  { id: 27, key: '', query: {} },
  { id: 28, key: '', query: {} },
  { id: 29, key: '', query: {} },
  { id: 30, key: '', query: {} },
  { id: 31, key: '', query: {} },
  { id: 32, key: '', query: {} },
  { id: 33, key: '', query: {} },
  { id: 34, key: '', query: {} },
  { id: 35, key: '', query: {} },
  { id: 36, key: '', query: {} },
  { id: 37, key: '', query: {} },
  { id: 38, key: '', query: {} },
  { id: 39, key: '', query: {} },
  { id: 40, key: '', query: {} },
  { id: 41, key: '', query: {} },
  { id: 42, key: '', query: {} },
  { id: 43, key: '', query: {} },
  { id: 44, key: '', query: {} },
  { id: 45, key: '', query: {} },
  { id: 46, key: '', query: {} },
  { id: 47, key: '', query: {} },
  { id: 48, key: '', query: {} },
  { id: 49, key: 'al-th', query: { name: 'AMC' } },
  { id: 50, key: 'al-th', query: { name: 'AP' } },
  { id: 51, key: 'al-th', query: { name: 'APB' } },
  { id: 52, key: '', query: {} },
  { id: 53, key: '', query: {} },
  { id: 54, key: '', query: {} },
  { id: 55, key: '', query: {} },
  { id: 56, key: '', query: {} },
  { id: 57, key: '', query: {} },
  { id: 58, key: '', query: {} },
  { id: 59, key: '', query: {} },
  { id: 60, key: '', query: {} },
  { id: 61, key: '', query: {} },
  { id: 62, key: '', query: {} },
  { id: 63, key: '', query: {} },
  { id: 64, key: '', query: {} },
  { id: 65, key: 'al-sil-01', query: {} },
  { id: 66, key: 'al-sil-02', query: {} },
  { id: 67, key: 'al-sil-03', query: {} },
  { id: 68, key: 'al-sil-04', query: {} },
  { id: 69, key: 'al-sil-05', query: {} },
  { id: 70, key: 'al-sil-06', query: {} },
  { id: 71, key: 'al-sil-07', query: {} },
  { id: 72, key: 'al-sil-08', query: {} },
  { id: 73, key: 'al-sil-09', query: {} },
  { id: 74, key: 'al-sil-10', query: {} },
  { id: 75, key: 'al-sil-11', query: {} },
  { id: 76, key: 'al-sil-12', query: {} },
  { id: 77, key: 'al-sil-13', query: {} },
  { id: 78, key: 'al-sil-14', query: {} },
  { id: 79, key: 'al-sil-15', query: {} },
  { id: 80, key: 'al-sil-16', query: {} },
  { id: 81, key: 'al-v-to', query: {} },
  { id: 82, key: 'al-v-fdbk', query: {} },
  { id: 83, key: 'al-lv', query: {} },
  { id: 84, key: 'al-lv-diff', query: {} },
  { id: 85, key: 'al-v-lck-to', query: {} },
  { id: 86, key: 'al-v-lck-fc', query: {} },
  { id: 87, key: 'al-h-to', query: {} },
  { id: 88, key: 'al-lh', query: {} },
  { id: 89, key: 'al-lh-diff', query: {} },
  { id: 90, key: 'al-r-to', query: {} },
  { id: 91, key: 'al-enr', query: {} },
  { id: 92, key: '', query: {} },
  { id: 93, key: '', query: {} },
  { id: 94, key: '', query: {} },
  { id: 95, key: '', query: {} },
  { id: 96, key: '', query: {} },
  { id: 97, key: 'al-pn', query: { name: 'KKP' } },
  { id: 98, key: 'al-pn', query: { name: 'IV1' } },
  { id: 99, key: 'al-pn', query: { name: 'IV2' } },
  { id: 100, key: 'al-pn', query: { name: 'LV1' } },
  { id: 101, key: 'al-pn', query: { name: 'LV2' } },
  { id: 102, key: 'al-pn', query: { name: 'LH1' } },
  { id: 103, key: 'al-pn', query: { name: 'LH2' } },
  { id: 104, key: 'al-pn', query: { name: 'ENR' } },
  { id: 105, key: 'al-fs', query: { name: 'BBL' } },
  { id: 106, key: 'al-fs', query: { name: 'UG/BBL' } },
  { id: 107, key: 'al-fs', query: { name: 'BBP' } },
  { id: 108, key: 'al-fs', query: { name: 'ETA/B' } },
  { id: 109, key: 'al-fs', query: { name: 'BBH' } },
  { id: 110, key: 'al-fs', query: { name: 'ETL/R' } },
  { id: 111, key: 'al-fs', query: { name: 'EZD' } },
  { id: 112, key: 'al-fs', query: { name: 'FAL/WAL' } },
  { id: 113, key: 'al-iv', query: { nr: 1 } },
  { id: 114, key: 'al-iv', query: { nr: 2 } },
  { id: 115, key: 'al-th', query: { name: 'RTA' } },
  { id: 116, key: 'al-th', query: { name: 'AIV2' } },
  { id: 117, key: 'al-th', query: { name: 'AF8' } },
  { id: 118, key: 'al-th', query: { name: 'AKKP' } },
  { id: 119, key: 'al-th', query: { name: 'ASBK1' } },
  { id: 120, key: 'al-th', query: { name: 'FE12' } },
  { id: 121, key: 'al-th', query: { name: 'AMM1' } },
  { id: 122, key: 'al-th', query: { name: 'ACR' } },
  { id: 123, key: 'al-th', query: { name: 'FE3' } },
  { id: 124, key: 'al-th', query: { name: 'ASBK2' } },
  { id: 125, key: 'al-th', query: { name: 'AH' } },
  { id: 126, key: 'al-th', query: { name: 'AD' } },
  { id: 127, key: 'al-th', query: { name: 'MTC' } },
  { id: 128, key: '', query: {} }
]
exports.DEVICES = [
  { id: 0, key: 'operator' },
  { id: 1, key: 'EU1' },
  { id: 2, key: 'EU2' },
  { id: 3, key: 'EL' }
]

exports.MODES = [
  { id: 0, key: 'mode-no' },
  { id: 1, key: 'mode-data-edit' },
  { id: 2, key: 'mode-data-read' },
  { id: 3, key: 'mode-eme-1' },
  { id: 4, key: 'mode-eme-2' },
  { id: 5, key: 'mode-no' },
  { id: 6, key: 'mode-step' },
  { id: 7, key: 'mode-preset' },
  { id: 8, key: 'mode-auto' }
]

exports.OPERATIONS = [
  { id: 0, key: 'op-no' },
  { id: 1, key: 'op-alarm-on' },
  { id: 2, key: 'op-alarm-off' },
  { id: 3, key: 'op-switch-mode' },
  { id: 4, key: 'op-change-pin' },
  { id: 5, key: 'op-stall-in' },
  { id: 6, key: 'op-stall-out' },
  { id: 7, key: 'op-shuffle-in' },
  { id: 8, key: 'op-shuffle-out' },
  { id: 9, key: 'op-stall-rsv' },
  { id: 10, key: 'op-req-exit' },
  { id: 11, key: 'op-req-entry' },
  { id: 12, key: 'op-no' },
  { id: 13, key: 'op-no' },
  { id: 14, key: 'op-no' },
  { id: 15, key: 'op-no' }
]
