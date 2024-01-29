import { Injectable } from '@nestjs/common';
import { GooglePlaceDto } from './dto/googlePlace.dto';
import { PrismaService } from 'src/prisma.service';
import { ProfileDto } from '../users/dto/profile.dto';
import { PlacesAndProfilesDto } from './dto/placesAndProfiles.dto';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchProfiles(query: string) {
    const profiles = await this.prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query } },
          { firstname: { contains: query } },
        ],
      },
    });

    return profiles.map(
      (profile) =>
        new ProfileDto({
          id: profile.id,
          firstname: profile.firstname,
          username: profile.username,
          avatar: profile.avatar,
        }),
    );
  }

  async searchGooglePlaces(query: string) {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    if (!GOOGLE_API_KEY) {
      throw new Error('Missing Google API Key');
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_API_KEY,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.shortFormattedAddress,places.types,places.googleMapsUri',
    };

    const acceptableTypes = ['bar', 'restaurant', 'food'];

    try {
      const response = await fetch(
        'https://places.googleapis.com/v1/places:searchText',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            languageCode: 'en',
            textQuery: query,
            // New York City
            locationRestriction: {
              rectangle: {
                low: {
                  latitude: 40.477398,
                  longitude: -74.259087,
                },
                high: {
                  latitude: 40.91618,
                  longitude: -73.70018,
                },
              },
            },
            maxResultCount: 7,
          }),
        },
      );

      const responseJson = await response.json();
      const responseTyped = responseJson.places as GooglePlaceDto[];

      const filteredData = responseTyped.filter((place) => {
        return place.types.some((type) => acceptableTypes.includes(type));
      });

      return filteredData.map(
        (place) =>
          new GooglePlaceDto({
            id: place.id,
            displayName: place.displayName,
            googleMapsUri: place.googleMapsUri,
            shortFormattedAddress: place.shortFormattedAddress,
            types: place.types,
          }),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchPlacesAndProfiles(query: string) {
    const places = await this.searchGooglePlaces(query);
    const profiles = await this.searchProfiles(query);

    return new PlacesAndProfilesDto({
      places,
      profiles,
    });
  }
}
