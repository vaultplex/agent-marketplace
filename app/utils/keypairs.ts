import * as fs from "fs";
import * as path from "path";
import { createSignerFromKeypair, Keypair, Signer, Umi } from "@metaplex-foundation/umi";
import { Keypair as Web3Keypair } from "@solana/web3.js";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
interface UmiKeypairs {
    keypair: Keypair,
    signer: Signer,
}

const DEFAULT_KEY_DIR_NAME = "/../keypairs/";
export function loadKeypair(umi: Umi, name: string): UmiKeypairs {
    const walletUri = `${DEFAULT_KEY_DIR_NAME}${name}-keypair.json`;

    const walletFile = fs.readFileSync(
        path.join(__dirname, walletUri)
    )

    let web3Keypair = Web3Keypair.fromSecretKey(new Uint8Array(walletFile));

    let keypair = fromWeb3JsKeypair(web3Keypair);

    const signer = createSignerFromKeypair(umi, keypair);

    return { keypair, signer};
}

export function saveKeypairToFile(
    keypair: Web3Keypair,
    fileName: string,
    dirName: string = DEFAULT_KEY_DIR_NAME
  ) {
    fileName = path.join(dirName, `${fileName}.json`);
  
    // create the `dirName` directory, if it does not exists
    if (!fs.existsSync(`./${dirName}/`)) fs.mkdirSync(`./${dirName}/`);
  
    // remove the current file, if it already exists
    if (fs.existsSync(fileName)) fs.unlinkSync(fileName);
  
    // write the `secretKey` value as a string
    fs.writeFileSync(fileName, `[${keypair.secretKey.toString()}]`, {
      encoding: "utf-8",
    });
  
    return fileName;
  }
  
  export function loadKeypairFromFile(absPath: string) {
    try {
      if (!absPath) throw Error("No path provided");
      if (!fs.existsSync(absPath)) throw Error("File does not exist.");
  
      // load the keypair from the file
      const keyfileBytes = JSON.parse(
        fs.readFileSync(absPath, { encoding: "utf-8" })
      );
      // parse the loaded secretKey into a valid keypair
      const keypair = Web3Keypair.fromSecretKey(new Uint8Array(keyfileBytes));
      return keypair;
    } catch (err) {
      // return false;
      throw err;
    }
  }

  export function loadOrGenerateKeypair(
    fileName: string,
    dirName: string = DEFAULT_KEY_DIR_NAME
  ) {
    try {
      // compute the path to locate the file
      const searchPath = path.join(dirName, `${fileName}.json`);
      let keypair = Web3Keypair.generate();
  
      // attempt to load the keypair from the file
      if (fs.existsSync(searchPath)) keypair = loadKeypairFromFile(searchPath);
      // when unable to locate the keypair, save the new one
      else saveKeypairToFile(keypair, fileName, dirName);
  
      return keypair;
    } catch (err) {
      console.error("loadOrGenerateKeypair:", err);
      throw err;
    }
  }