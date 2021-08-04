package com.nashtech.assetmanagementwebservice.service;

import com.nashtech.assetmanagementwebservice.model.dto.CategoryDTO;

public interface CategoryService {
	CategoryDTO findCategoryById(Integer id);
}
