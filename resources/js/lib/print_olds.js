// PrintPDF.js

import { pdf } from '@react-pdf/renderer';
import qz from 'qz-tray';
import { KJUR, hextob64 } from 'jsrsasign'; // 👈 Asegúrate de tener esta línea

export const PrintPDF = (element) => {
    const print = async () => {
        try {
            // 1. Generar el PDF en blob
            const blob = await pdf(element).toBlob();
            const reader = new FileReader();

            reader.onload = async () => {
                const base64 = reader.result.split(',')[1]; // quitar encabezado

                // 🔐 CONFIGURAR FIRMA DIGITAL (solo para pruebas)
                const privateKeyPEM = `
-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC+lBkIYJfS57MN
Va6HLsxZNXo/zarR/6sq9YzqkYnmMO2X9j7PS0gFFGvCZ4YOUmqsVRfRL+ud0toG
xkwnnPJo0bHd8XF7hY+Lr62Wr1KSA4LxS0zICpweSKP/5eOguXHy2bUuWJdQfeRs
md91mzrhq910HOo+1R/5KMxjiIFI+GFBgTfY9gTMXyRPwAooeCC1rRWrEdseaLHY
fenHg/jtxlic+tdlp8WNBl4MEBY14KDsXDoTI9DCDRo+a99L68qyXxx+zoGD+4ey
ti/l8Z6eu1BZ3FDwBVcECUJ4fZV7gBdMCtOEihavB45iC7k19LE2M5zPlPLphhtQ
3OaFFkkdAgMBAAECggEAFW5+Ki0CpdscjaFXESi4HkgfSVGNpjQEQb5/bFmVkmdq
MK6mfZVPshKL077kmnO2P08KcKHc81Ck6CIgqkvCDvuV7wmZ43QvolvNP6bTuEvg
y9XV+qEG0XkFyF9H6+ku4UqOT3ny+kBOEdB0Cru8MWisbMRbq1k4UUK/SWoub9Ad
IeSELHNDWLXT6ymFJopXke6aSlp4cQ1Gbrz8bYHX7Bdo0+keUHRU1zDd2lQkpYP9
2W0RhKstYVnxBHtAfP3N5ZLo7xEsm7VcIpf4EdtAJa4yCODBlNH1Aj66hboIgMmG
bUuptF8sIjm9bnSqrZcFf3k8gO6EC3dUEq3Ao7GKwQKBgQDdVYFhFYMDXPlmyW54
gjbSCQy/Q7GnzfM6pLkNb3Q002ClRSfIg4adSGgVtet+kbs8OfIE/RXSgpVFTXn9
8nHX0AayGjv1IXCp49d54C2xjInEIz4ZYBJ8Qt3ck0yhoXSclU0Z59EMq5hhHYj9
kum4cM2/WKoLffR979QavWGMRQKBgQDcbW+Ls49bVNGbT4aQd2FCk64njBlzl2X9
1hKyb5pPiIggTAQqjCvzI7MEoWFGpmqbvPFLmpSyBSLbLcq8CQTcDMOXaSddvUW/
lwMFbwmJI8H8ycybi6hReSMsfx6I6FrXoyWwKbfXLoK1xWAqpHFVf1iHCXczfcq8
XN9GsXgS+QKBgQCTOVITCuUXsptuxKQH4s2mTkC9ZMDiVrrokjNJfY51qPjLVkHN
PbeoHUam0lhv224I9J5ItTPzz8qMy6lOwxr4q7YYeBzTxEeVqillNzoNtObaoXqo
FGCXaT78frpldOkFUsZzaeCDJgz45FWAHl36woYJNmf9tu2Pa5zRoJEnZQKBgQCk
o4CrQcSTnPiqHm4NvX0BszhjBXuFINHnFFwGtuD1Aq9aIC0EconpIwL1NGxpzqbW
B/vaUm05wihUuREx/TKKAWad0sa6d0J/ZZW2G0duDS05WKjgjSF9KROiipgN/i7L
3Wmq+J39tRmgFvpLH2QfTeybf/Bun0gsBNon/SoIUQKBgQCzAmdQeFgBaq+utKps
Hh8Ckp4ZuCK+7lUGbc/2EvGKWxylqObmiCrL2wS0Nn4jE6sfF3GAtO68EiyjEDmD
dxsH7zPzaeu7463L5DM4srASeUF2V1iyqR1+ulN2o0++O3u7/zgrSsFZp8FfXETt
D3LdVNz13kGz2vkROg11lYuJjA==
-----END PRIVATE KEY-----`;

                const certificatePEM = `
-----BEGIN CERTIFICATE-----
MIIDDzCCAfegAwIBAgIUCbjq5i2KXJI590Ve64OiSElS41owDQYJKoZIhvcNAQEL
BQAwFzEVMBMGA1UEAwwMTWkgU2l0aW8gV2ViMB4XDTI1MDcyMTE2Mzg1OVoXDTQ1
MDcxNjE2Mzg1OVowFzEVMBMGA1UEAwwMTWkgU2l0aW8gV2ViMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAitLkdmLAGaAbIYnwlvXc0RsXM8JQ8WuZ8bqG
cCue5hSyQ31UjHynbdq9Y3rbYua63Pk2qpvbS2o0lfpp1wNcNDCXNLqKs6mXYsie
JGhEiJ0zzL/L/FhVWrPOrbKmNiNxPy/So9qEnCyXaofGA6MGvwWGe6F1wNPATy1V
nu4ON8Z6/KQabXaTQ9WGKV0pNyFi8WTdTj/OuMVrTMYbIKetZeuI8eP1BgFhZrpN
xTB9o7q6YHgZBD2saPKe8MICKRQabAjC57MNh8ru92zIOIoL4U//U5XcwZQwItMp
5d/lDYRB+c/CctvNNt+Q/qMDF3Xt+ZKjkafY0/PIA3zMRzF7EQIDAQABo1MwUTAd
BgNVHQ4EFgQUNUa+C0NQVlq3TUn3AAUBt6ij0VQwHwYDVR0jBBgwFoAUNUa+C0NQ
Vlq3TUn3AAUBt6ij0VQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOC
AQEAbAE9z4GVebtHQbvRQdU5jxSErQUk6dG5n81xpveFp1BNm8ZOWqbshGnvJQb5
Ah4vjTKS4/5A/fepPjeVU+iREnD3Yg79Y2j+ETStc2QkP8j+OL6thCcjccJlsSs7
yszkj1SfigPU+7DFSaN/mpOOGE0280AbuPix3RDwcvioWNbyGgz8xB08wj8e9uuH
Nv1LFuRdw3Vl4xWdX4TV7jWV6DtmzOSmovQfFwyuuI2bXmfeQG7W8IOFjELTzmo7
3YnZ7ntDOV7TZd8wS9/NBuvd7x1TGc6hoXmoBXkyXLZcaSAuymYbSe+nnEJMSe8f
Q9UpDehAKL1/BkTqlEXmScEnEw==
-----END CERTIFICATE-----`;

                qz.security.setCertificatePromise(() => {
                    return Promise.resolve(certificatePEM);
                });

                qz.security.setSignaturePromise((toSign) => {
                    const sig = new KJUR.crypto.Signature({
                        alg: 'SHA1withRSA',
                    });
                    const key = KJUR.KEYUTIL.getKey(privateKeyPEM); // ✅ más seguro
                    sig.init(key);
                    sig.updateString(toSign);
                    const hexSignature = sig.sign();
                    return Promise.resolve(hextob64(hexSignature));
                });

                // 2. Conectar con QZ
                if (!qz.websocket.isActive()) {
                    await qz.websocket.connect();
                }

                // 3. Obtener impresoras disponibles (opcional)
                const printers = await qz.printers.find();
                console.log('Impresoras disponibles:', printers);

                // 4. Configurar la impresora
                const config = qz.configs.create(
                    'Kyocera-ECOSYS-M2640idw-oti',
                    {
                        copies: 1,
                        duplex: false,
                        colorType: 'blackwhite',
                        rasterize: false,
                        altPrinting: false,
                    },
                );

                // 5. Crear el objeto de impresión
                const data = [
                    {
                        type: 'pdf',
                        format: 'base64',
                        data: base64,
                    },
                ];

                // 6. Imprimir
                await qz.print(config, data);

                alert('Impresión enviada');
            };

            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error al imprimir:', error);
        }
    };

    print();
};
