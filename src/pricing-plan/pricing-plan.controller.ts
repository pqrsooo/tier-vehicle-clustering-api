import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PricingPlanDTO, PricingPlanMapper } from './pricing-plan.dto';
import { PricingPlanService } from './pricing-plan.service';

@Controller('pricing-plans')
export class PricingPlanController {
  constructor(private readonly pricingPlanService: PricingPlanService) {}

  @Get()
  public async getPricingPlans(): Promise<PricingPlanDTO[]> {
    const pricingPlans = await this.pricingPlanService.getPricingPlans();
    return pricingPlans.map(PricingPlanMapper.toDTO);
  }

  @Get(':id')
  public async getPricingPlan(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<PricingPlanDTO> {
    const pricingPlan = await this.pricingPlanService.getPricingPlan(id);
    if (pricingPlan == null) {
      res.status(HttpStatus.NOT_FOUND);
      return null;
    }
    return PricingPlanMapper.toDTO(pricingPlan);
  }
}
