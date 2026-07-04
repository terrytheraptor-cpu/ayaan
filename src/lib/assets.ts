// Maps DB image_key values to the bundled asset URL.
// Add new keys here when a new asset is added to src/assets.
import heroLiving from "@/assets/hero-living.jpg";
import catBedroom from "@/assets/cat-bedroom.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catOffice from "@/assets/cat-office.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import catLighting from "@/assets/cat-lighting.jpg";
import catLiving from "@/assets/cat-living.jpg";
import catDecor from "@/assets/cat-decor.jpg";
import catStorage from "@/assets/cat-storage.jpg";
import catMattress from "@/assets/cat-mattress.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import pSofaHalo from "@/assets/p-sofa-halo.jpg";
import pTableMarlow from "@/assets/p-table-marlow.jpg";
import pBedAtlas from "@/assets/p-bed-atlas.jpg";
import pDeskOrion from "@/assets/p-desk-orion.jpg";
import pLampLuna from "@/assets/p-lamp-luna.jpg";
import pLoungeSolace from "@/assets/p-lounge-solace.jpg";
import pChairNimbus from "@/assets/p-chair-nimbus.jpg";
import pTableMira from "@/assets/p-table-mira.jpg";
import pWardrobeVerde from "@/assets/p-wardrobe-verde.jpg";
import pVaseCora from "@/assets/p-vase-cora.jpg";
import pMattressCloud from "@/assets/p-mattress-cloud.jpg";
import pRugDune from "@/assets/p-rug-dune.jpg";
import lifestyleHotel from "@/assets/lifestyle-hotel.jpg";
import lifestyleVilla from "@/assets/lifestyle-villa.jpg";

const map: Record<string, string> = {
  "hero-living": heroLiving,
  "cat-bedroom": catBedroom,
  "cat-dining": catDining,
  "cat-office": catOffice,
  "cat-outdoor": catOutdoor,
  "cat-lighting": catLighting,
  "cat-living": catLiving,
  "cat-decor": catDecor,
  "cat-storage": catStorage,
  "cat-mattress": catMattress,
  "cat-accessories": catAccessories,
  "p-sofa-halo": pSofaHalo,
  "p-table-marlow": pTableMarlow,
  "p-bed-atlas": pBedAtlas,
  "p-desk-orion": pDeskOrion,
  "p-lamp-luna": pLampLuna,
  "p-lounge-solace": pLoungeSolace,
  "p-chair-nimbus": pChairNimbus,
  "p-table-mira": pTableMira,
  "p-wardrobe-verde": pWardrobeVerde,
  "p-vase-cora": pVaseCora,
  "p-mattress-cloud": pMattressCloud,
  "p-rug-dune": pRugDune,
  "lifestyle-hotel": lifestyleHotel,
  "lifestyle-villa": lifestyleVilla,
};

export function assetUrl(key: string | null | undefined): string {
  if (!key) return catLiving;
  return map[key] ?? catLiving;
}

export { heroLiving, lifestyleHotel, lifestyleVilla };
