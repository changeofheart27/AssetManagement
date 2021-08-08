package com.nashtech.assetmanagementwebservice.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nashtech.assetmanagementwebservice.model.dto.CategoryDTO;
import com.nashtech.assetmanagementwebservice.entity.Category;
import com.nashtech.assetmanagementwebservice.exception.DuplicateRecordException;
import com.nashtech.assetmanagementwebservice.model.mapper.CategoryMapper;
import com.nashtech.assetmanagementwebservice.repository.CategoryRepository;
import com.nashtech.assetmanagementwebservice.service.CategoryService;

@Service
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {
	private final CategoryRepository categoryRepository;
	private final CategoryMapper categoryMapper;
	
	@Autowired
	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
		categoryMapper = new CategoryMapper();
	}

	@Override
	@Transactional
	public List<CategoryDTO> getCategoryList() {
		List<Category> categories = categoryRepository.findAll();
		return categories.stream().map(categoryMapper::fromEntity).collect(Collectors.toList());
	}
	
	@Override
	@Transactional
	public CategoryDTO findCategoryById(Integer id) {
		Category category = categoryRepository.getById(id);
		return categoryMapper.fromEntity(category);
	}

	@Override
	@Transactional
	public CategoryDTO createCategory(CategoryDTO payload) {
		if (categoryRepository.getPrefixList().contains(payload.getPrefix())) {
			throw new DuplicateRecordException("Prefix must be unique");
		}
		if (categoryRepository.getNameList().contains(payload.getName())) {
			throw new DuplicateRecordException("Name must be unique");
		}
		Category category = categoryMapper.fromDTO(payload);
		categoryRepository.save(category);
		return categoryMapper.fromEntity(category);
	}

}
