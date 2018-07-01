import { CurveballMaterialModule } from './curveball-material.module';

describe('CurveballMaterialModule', () => {
  let curveballMaterialModule: CurveballMaterialModule;

  beforeEach(() => {
    curveballMaterialModule = new CurveballMaterialModule();
  });

  it('should create an instance', () => {
    expect(curveballMaterialModule).toBeTruthy();
  });
});
