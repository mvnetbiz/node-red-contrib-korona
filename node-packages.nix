# This file has been generated by node2nix 1.7.0. Do not edit!

{nodeEnv, fetchurl, fetchgit, globalBuildInputs ? []}:

let
  sources = {
    "asynckit-0.4.0" = {
      name = "asynckit";
      packageName = "asynckit";
      version = "0.4.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz";
        sha1 = "c79ed97f7f34cb8f2ba1bc9790bcc366474b4b79";
      };
    };
    "cloud-api-v3-js-client-git://github.com/COMBASE/cloud-api-v3-js-client.git#1.0.0" = {
      name = "cloud-api-v3-js-client";
      packageName = "cloud-api-v3-js-client";
      version = "1.0.0";
      src = fetchgit {
        url = "git://github.com/COMBASE/cloud-api-v3-js-client.git";
        rev = "2c09782e8729f1238793cd25cc53e558516340fb";
        sha256 = "b6bc1a03fc528162aba302bcdf079de04d61050336f69c00e9eac71baceaf3cb";
      };
    };
    "combined-stream-1.0.8" = {
      name = "combined-stream";
      packageName = "combined-stream";
      version = "1.0.8";
      src = fetchurl {
        url = "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz";
        sha512 = "FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==";
      };
    };
    "component-emitter-1.3.0" = {
      name = "component-emitter";
      packageName = "component-emitter";
      version = "1.3.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/component-emitter/-/component-emitter-1.3.0.tgz";
        sha512 = "Rd3se6QB+sO1TwqZjscQrurpEPIfO0/yYnSin6Q/rD3mOutHvUrCAhJub3r90uNb+SESBuE0QYoB90YdfatsRg==";
      };
    };
    "cookiejar-2.1.2" = {
      name = "cookiejar";
      packageName = "cookiejar";
      version = "2.1.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/cookiejar/-/cookiejar-2.1.2.tgz";
        sha512 = "Mw+adcfzPxcPeI+0WlvRrr/3lGVO0bD75SxX6811cxSh1Wbxx7xZBGK1eVtDf6si8rg2lhnUjsVLMFMfbRIuwA==";
      };
    };
    "core-util-is-1.0.2" = {
      name = "core-util-is";
      packageName = "core-util-is";
      version = "1.0.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz";
        sha1 = "b5fd54220aa2bc5ab57aab7140c940754503c1a7";
      };
    };
    "debug-3.2.6" = {
      name = "debug";
      packageName = "debug";
      version = "3.2.6";
      src = fetchurl {
        url = "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz";
        sha512 = "mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==";
      };
    };
    "delayed-stream-1.0.0" = {
      name = "delayed-stream";
      packageName = "delayed-stream";
      version = "1.0.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz";
        sha1 = "df3ae199acadfb7d440aaae0b29e2272b24ec619";
      };
    };
    "extend-3.0.2" = {
      name = "extend";
      packageName = "extend";
      version = "3.0.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz";
        sha512 = "fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g==";
      };
    };
    "form-data-2.5.1" = {
      name = "form-data";
      packageName = "form-data";
      version = "2.5.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/form-data/-/form-data-2.5.1.tgz";
        sha512 = "m21N3WOmEEURgk6B9GLOE4RuWOFf28Lhh9qGYeNlGq4VDXUlJy2th2slBNU8Gp8EzloYZOibZJ7t5ecIrFSjVA==";
      };
    };
    "formidable-1.2.1" = {
      name = "formidable";
      packageName = "formidable";
      version = "1.2.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/formidable/-/formidable-1.2.1.tgz";
        sha512 = "Fs9VRguL0gqGHkXS5GQiMCr1VhZBxz0JnJs4JmMp/2jL18Fmbzvv7vOFRU+U8TBkHEE/CX1qDXzJplVULgsLeg==";
      };
    };
    "inherits-2.0.4" = {
      name = "inherits";
      packageName = "inherits";
      version = "2.0.4";
      src = fetchurl {
        url = "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz";
        sha512 = "k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==";
      };
    };
    "isarray-1.0.0" = {
      name = "isarray";
      packageName = "isarray";
      version = "1.0.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz";
        sha1 = "bb935d48582cba168c06834957a54a3e07124f11";
      };
    };
    "methods-1.1.2" = {
      name = "methods";
      packageName = "methods";
      version = "1.1.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz";
        sha1 = "5529a4d67654134edcc5266656835b0f851afcee";
      };
    };
    "mime-1.6.0" = {
      name = "mime";
      packageName = "mime";
      version = "1.6.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz";
        sha512 = "x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==";
      };
    };
    "mime-db-1.42.0" = {
      name = "mime-db";
      packageName = "mime-db";
      version = "1.42.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/mime-db/-/mime-db-1.42.0.tgz";
        sha512 = "UbfJCR4UAVRNgMpfImz05smAXK7+c+ZntjaA26ANtkXLlOe947Aag5zdIcKQULAiF9Cq4WxBi9jUs5zkA84bYQ==";
      };
    };
    "mime-types-2.1.25" = {
      name = "mime-types";
      packageName = "mime-types";
      version = "2.1.25";
      src = fetchurl {
        url = "https://registry.npmjs.org/mime-types/-/mime-types-2.1.25.tgz";
        sha512 = "5KhStqB5xpTAeGqKBAMgwaYMnQik7teQN4IAzC7npDv6kzeU6prfkR67bc87J1kWMPGkoaZSq1npmexMgkmEVg==";
      };
    };
    "ms-2.1.2" = {
      name = "ms";
      packageName = "ms";
      version = "2.1.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz";
        sha512 = "sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==";
      };
    };
    "process-nextick-args-2.0.1" = {
      name = "process-nextick-args";
      packageName = "process-nextick-args";
      version = "2.0.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz";
        sha512 = "3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag==";
      };
    };
    "qs-6.9.1" = {
      name = "qs";
      packageName = "qs";
      version = "6.9.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/qs/-/qs-6.9.1.tgz";
        sha512 = "Cxm7/SS/y/Z3MHWSxXb8lIFqgqBowP5JMlTUFyJN88y0SGQhVmZnqFK/PeuMX9LzUyWsqqhNxIyg0jlzq946yA==";
      };
    };
    "readable-stream-2.3.6" = {
      name = "readable-stream";
      packageName = "readable-stream";
      version = "2.3.6";
      src = fetchurl {
        url = "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.6.tgz";
        sha512 = "tQtKA9WIAhBF3+VLAseyMqZeBjW0AHJoxOtYqSUZNJxauErmLbVm2FW1y+J/YA9dUrAC39ITejlZWhVIwawkKw==";
      };
    };
    "safe-buffer-5.1.2" = {
      name = "safe-buffer";
      packageName = "safe-buffer";
      version = "5.1.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz";
        sha512 = "Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==";
      };
    };
    "string_decoder-1.1.1" = {
      name = "string_decoder";
      packageName = "string_decoder";
      version = "1.1.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz";
        sha512 = "n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==";
      };
    };
    "superagent-3.8.3" = {
      name = "superagent";
      packageName = "superagent";
      version = "3.8.3";
      src = fetchurl {
        url = "https://registry.npmjs.org/superagent/-/superagent-3.8.3.tgz";
        sha512 = "GLQtLMCoEIK4eDv6OGtkOoSMt3D+oq0y3dsxMuYuDvaNUvuT8eFBuLmfR0iYYzHC1e8hpzC6ZsxbuP6DIalMFA==";
      };
    };
    "util-deprecate-1.0.2" = {
      name = "util-deprecate";
      packageName = "util-deprecate";
      version = "1.0.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz";
        sha1 = "450d4dc9fa70de732762fbd2d4a28981419a0ccf";
      };
    };
  };
  args = {
    name = "node-red-contrib-korona";
    packageName = "node-red-contrib-korona";
    version = "1.0.2";
    src = ./.;
    dependencies = [
      sources."asynckit-0.4.0"
      sources."cloud-api-v3-js-client-git://github.com/COMBASE/cloud-api-v3-js-client.git#1.0.0"
      sources."combined-stream-1.0.8"
      sources."component-emitter-1.3.0"
      sources."cookiejar-2.1.2"
      sources."core-util-is-1.0.2"
      sources."debug-3.2.6"
      sources."delayed-stream-1.0.0"
      sources."extend-3.0.2"
      sources."form-data-2.5.1"
      sources."formidable-1.2.1"
      sources."inherits-2.0.4"
      sources."isarray-1.0.0"
      sources."methods-1.1.2"
      sources."mime-1.6.0"
      sources."mime-db-1.42.0"
      sources."mime-types-2.1.25"
      sources."ms-2.1.2"
      sources."process-nextick-args-2.0.1"
      sources."qs-6.9.1"
      sources."readable-stream-2.3.6"
      sources."safe-buffer-5.1.2"
      sources."string_decoder-1.1.1"
      sources."superagent-3.8.3"
      sources."util-deprecate-1.0.2"
    ];
    buildInputs = globalBuildInputs;
    meta = {
      description = "Korona.Cloud for node-red";
      homepage = "https://github.com/COMBASE/node-red-contrib-korona#readme";
      license = "MIT";
    };
    production = true;
    bypassCache = true;
    reconstructLock = true;
  };
in
{
  tarball = nodeEnv.buildNodeSourceDist args;
  package = nodeEnv.buildNodePackage args;
  shell = nodeEnv.buildNodeShell args;
}