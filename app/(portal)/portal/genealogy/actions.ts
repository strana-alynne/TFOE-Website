"use server";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export interface OrgData {
  Title: string;
  natlpresident?: { name: string; image?: any };
  governor?: { name: string; image?: any };
  clubpresident?: { name: string; image?: any };
  clubvicepresident?: { name: string; image?: any };
  assemblymen?: Array<{ name: string; image?: any }>;
  alternateassemblymen?: Array<{ name: string; image?: any }>;
  secretary?: { name: string; image?: any };
  assistantsecretary?: { name: string; image?: any };
  treasurer?: { name: string; image?: any };
  assistanttreasurer?: { name: string; image?: any };
  auditor?: { name: string; image?: any };
  assistantauditor?: { name: string; image?: any };
  clubdirectors?: Array<{ name: string; image?: any }>;
  // Committee chairs
  waysandmeans?: { name: string; image?: any };
  waysandmeansmembers?: Array<{ name: string; image?: any }>;
  tribunalchair?: { name: string; image?: any };
  tribunalmembers?: Array<{ name: string; image?: any }>;
  oversightchair?: { name: string; image?: any };
  oversightmembers?: Array<{ name: string; image?: any }>;
  alalayagilachair?: { name: string; image?: any };
  alalayagilachairmembers?: Array<{ name: string; image?: any }>;
  protocolchair?: { name: string; image?: any };
  protocolmembers?: Array<{ name: string; image?: any }>;
  awardschair?: { name: string; image?: any };
  awardsmembers?: Array<{ name: string; image?: any }>;
  publicinfochair?: { name: string; image?: any };
  publicinfomembers?: Array<{ name: string; image?: any }>;
}

export interface ProcessedOrgData extends Omit<OrgData, 'natlpresident' | 'governor' | 'clubpresident' | 'clubvicepresident' | 'assemblymen' | 'alternateassemblymen' | 'secretary' | 'assistantsecretary' | 'treasurer' | 'assistanttreasurer' | 'auditor' | 'assistantauditor' | 'clubdirectors' | 'waysandmeans' | 'waysandmeansmembers' | 'tribunalchair' | 'tribunalmembers' | 'oversightchair' | 'oversightmembers' | 'alalayagilachair' | 'alalayagilachairmembers' | 'protocolchair' | 'protocolmembers' | 'awardschair' | 'awardsmembers' | 'publicinfochair' | 'publicinfomembers'> {
  natlpresident?: { name: string; imageUrl?: string };
  governor?: { name: string; imageUrl?: string };
  clubpresident?: { name: string; imageUrl?: string };
  clubvicepresident?: { name: string; imageUrl?: string };
  assemblymen?: Array<{ name: string; imageUrl?: string }>;
  alternateassemblymen?: Array<{ name: string; imageUrl?: string }>;
  secretary?: { name: string; imageUrl?: string };
  assistantsecretary?: { name: string; imageUrl?: string };
  treasurer?: { name: string; imageUrl?: string };
  assistanttreasurer?: { name: string; imageUrl?: string };
  auditor?: { name: string; imageUrl?: string };
  assistantauditor?: { name: string; imageUrl?: string };
  clubdirectors?: Array<{ name: string; imageUrl?: string }>;
  waysandmeans?: { name: string; imageUrl?: string };
  waysandmeansmembers?: Array<{ name: string; imageUrl?: string }>;
  tribunalchair?: { name: string; imageUrl?: string };
  tribunalmembers?: Array<{ name: string; imageUrl?: string }>;
  oversightchair?: { name: string; imageUrl?: string };
  oversightmembers?: Array<{ name: string; imageUrl?: string }>;
  alalayagilachair?: { name: string; imageUrl?: string };
  alalayagilachairmembers?: Array<{ name: string; imageUrl?: string }>;
  protocolchair?: { name: string; imageUrl?: string };
  protocolmembers?: Array<{ name: string; imageUrl?: string }>;
  awardschair?: { name: string; imageUrl?: string };
  awardsmembers?: Array<{ name: string; imageUrl?: string }>;
  publicinfochair?: { name: string; imageUrl?: string };
  publicinfomembers?: Array<{ name: string; imageUrl?: string }>;
}

function processImageUrl(image: any): string {
  return image ? urlFor(image).url() : "/logo.png";
}

function processPersonWithImage(person: { name: string; image?: any } | undefined) {
  if (!person) return undefined;
  return {
    name: person.name,
    imageUrl: processImageUrl(person.image)
  };
}

function processArrayWithImages(array: Array<{ name: string; image?: any }> | undefined) {
  if (!array) return undefined;
  return array.map(item => ({
    name: item.name,
    imageUrl: processImageUrl(item.image)
  }));
}

export async function getOrganizationalChart(): Promise<ProcessedOrgData | null> {
  try {
    const query = `*[_type == "organizationalchart"][0]`;
    const data: OrgData = await client.fetch(query);
    
    if (!data) return null;

    // Process all the data and convert Sanity image references to URLs
    const processedData: ProcessedOrgData = {
      Title: data.Title,
      natlpresident: processPersonWithImage(data.natlpresident),
      governor: processPersonWithImage(data.governor),
      clubpresident: processPersonWithImage(data.clubpresident),
      clubvicepresident: processPersonWithImage(data.clubvicepresident),
      assemblymen: processArrayWithImages(data.assemblymen),
      alternateassemblymen: processArrayWithImages(data.alternateassemblymen),
      secretary: processPersonWithImage(data.secretary),
      assistantsecretary: processPersonWithImage(data.assistantsecretary),
      treasurer: processPersonWithImage(data.treasurer),
      assistanttreasurer: processPersonWithImage(data.assistanttreasurer),
      auditor: processPersonWithImage(data.auditor),
      assistantauditor: processPersonWithImage(data.assistantauditor),
      clubdirectors: processArrayWithImages(data.clubdirectors),
      waysandmeans: processPersonWithImage(data.waysandmeans),
      waysandmeansmembers: processArrayWithImages(data.waysandmeansmembers),
      tribunalchair: processPersonWithImage(data.tribunalchair),
      tribunalmembers: processArrayWithImages(data.tribunalmembers),
      oversightchair: processPersonWithImage(data.oversightchair),
      oversightmembers: processArrayWithImages(data.oversightmembers),
      alalayagilachair: processPersonWithImage(data.alalayagilachair),
      alalayagilachairmembers: processArrayWithImages(data.alalayagilachairmembers),
      protocolchair: processPersonWithImage(data.protocolchair),
      protocolmembers: processArrayWithImages(data.protocolmembers),
      awardschair: processPersonWithImage(data.awardschair),
      awardsmembers: processArrayWithImages(data.awardsmembers),
      publicinfochair: processPersonWithImage(data.publicinfochair),
      publicinfomembers: processArrayWithImages(data.publicinfomembers),
    };

    return processedData;
  } catch (error) {
    console.error("Error fetching organizational data:", error);
    return null;
  }
}