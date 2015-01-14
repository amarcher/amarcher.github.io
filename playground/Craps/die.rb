class Die
  def initialize(sides)
    raise ArgumentError, "Die must have at least one side!" unless sides > 0
    @sides = sides
  end

  def sides
    @sides
  end

  def roll
    rand(1..@sides)
  end
end