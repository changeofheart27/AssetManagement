package com.nashtech.assetmanagementwebservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.nashtech.assetmanagementwebservice.dto.CategoryDTO;
import com.nashtech.assetmanagementwebservice.service.CategoryService;

@Controller
public class CategoryController {
	private final CategoryService categoryService;
	
	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	public CategoryDTO findById(Integer id) {
		return categoryService.findCategoryById(id);
	}
}
