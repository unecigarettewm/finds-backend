import { Injectable } from '@nestjs/common';
import { GooglePlaceDto } from './dto/googlePlace.dto';
import { GooglePlaceSearchResponseDto } from './dto/googlePlaceSearchResponse.dto';

@Injectable()
export class SearchService {
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

      return new GooglePlaceSearchResponseDto({
        places: filteredData,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
