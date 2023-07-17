import { stringToBytes } from './convert';
import Network from './net';
import * as dayjs from 'dayjs';

const ping = async (profile) => { 
  return await Network.ping(
    profile.address,
    profile.port,
    profile.key,
    profile.isSecureConnection
  );
}

const getStatus = async (profile) => {
  const statResults = (
    await Network.get(
      profile.address,
      profile.port,
      profile.key,
      profile.isSecureConnection,
      'stats'
    )
  ).data;

  statResults.disk.usedSpace =
    stringToBytes(statResults.disk.totalSpace) -
    stringToBytes(statResults.disk.freeSpace);

  const date = dayjs().format('HH:mm:ss');
  statResults.timestamp = date;

  return statResults;
}

const getWorlds = async (profile) => {
  const worldResults = (
    await Network.get(
      profile.address,
      profile.port,
      profile.key,
      profile.isSecureConnection,
      'worlds'
    )
  ).data.worlds;

  const worlds = [];
  const _worlds = await Promise.all(
    worldResults.map(({ uuid }) => 
      Network.get(
        profile.address,
        profile.port,
        profile.key,
        profile.isSecureConnection,
        `worlds/${uuid}`
      )
    )
  )
    
  for (const { data } of _worlds) {
    worlds[data.uuid] = data
  }

  return worlds;
}

const getPlayers = async (profile) => {
  const playerResults = (
    await Network.get(
      profile.address,
      profile.port,
      profile.key,
      profile.isSecureConnection,
      'players'
    )
  ).data.players;

  const players = []
  const _players = await Promise.all(
    playerResults.map(({ uuid }) =>
      Network.get(
        profile.address,
        profile.port,
        profile.key,
        profile.isSecureConnection,
        `players/${uuid}`
      )
    )
  );

  for (const { data } of _players) {
    players[data.uuid] = data
  }

  return players;
}

const getTraffic = async (profile) => {
  const trafficData = (
    await Network.get(
      profile.address,
      profile.port,
      profile.key,
      profile.isSecureConnection,
      'traffic'
    )
  ).data || { traffic: {} };

  const date = dayjs().format('HH:mm:ss');
  trafficData.timestamp = date;

  return trafficData;
}

export {
  ping,
  getStatus,
  getWorlds,
  getPlayers,
  getTraffic
}
