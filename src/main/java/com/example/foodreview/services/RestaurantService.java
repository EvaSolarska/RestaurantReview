package com.example.foodreview.services;

import com.example.foodreview.dto.RestaurantRequest;
import com.example.foodreview.dto.RestaurantResponse;
import com.example.foodreview.entities.Restaurant;
import com.example.foodreview.entities.Review;
import com.example.foodreview.exception.ResourceNotFoundException;
import com.example.foodreview.mapper.RestaurantMapper;
import com.example.foodreview.repositories.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantMapper restaurantMapper;

    public List<RestaurantResponse> findAll() {
        return restaurantRepository.findAll().stream()
                .map(this::mapToResponseWithStats)
                .toList();
    }

    public RestaurantResponse findById(Long id) {
        return restaurantRepository.findById(id)
                .map(this::mapToResponseWithStats)
                .orElseThrow(()-> new ResourceNotFoundException("Restaurant not found"));
    }

    public RestaurantResponse createRestaurant(RestaurantRequest request) {
        Restaurant restaurant = restaurantMapper.toEntity(request);
        Restaurant saved = restaurantRepository.save(restaurant);
        return mapToResponseWithStats(saved);
    }

    public RestaurantResponse updateRestaurant(Long id, RestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
        restaurantMapper.updateEntityFromRequest(request, restaurant);
        Restaurant updated = restaurantRepository.save(restaurant);
        return mapToResponseWithStats(updated);
    }

    public void deleteById(Long id) {
        if(!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Restaurant not found");
        }
        restaurantRepository.deleteById(id);
    }


    private RestaurantResponse mapToResponseWithStats(Restaurant restaurant) {
        RestaurantResponse response = restaurantMapper.toResponse(restaurant);

        var reviews = restaurant.getReviews();

        var stats = reviews.stream()
                .mapToInt(Review::getRating)
                .summaryStatistics();

        response.setReviewCount((int) stats.getCount());
        response.setAverageRating(round(stats.getAverage()));

        return response;
    }

    private double round(double value) {
        return BigDecimal.valueOf(value)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
