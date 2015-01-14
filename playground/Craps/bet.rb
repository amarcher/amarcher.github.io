require_relative "betdata"

class Bet
  attr_reader :name, :amount

  def initialize( name, amount = 0, point = nil )
    raise ArgumentError, "Must bet a positive amount!" unless amount >= 0
    raise ArgumentError, "There's no such bet as #{ name }!" unless BETS.keys.include?( name )
    @name = name.intern
    @amount = amount
    @resolved = false
    @winning_rolls = BETS[@name][:win_rolls]
    @losing_rolls = BETS[@name][:loss_rolls]
    @payouts = BETS[@name][:payouts]
    if point
      change_for_point( point )
    end
  end

  def resolved?
    @resolved
  end

  def change_for_point( point )
    if [:passline,:come].include?(@name)
      @winning_rolls = [ point ]
      @losing_rolls = [7]
      @payouts = { point => 1 }
    elsif [:dontpass,:dontcome].include?(@name)
      @winning_rolls = [7]
      @losing_rolls = [point]
      @payouts = { 7 => 1 }
    elsif [:odds].include?(@name)
      @winning_rolls = [point]
      @losing_rolls = [7]
      case point
      when 4, 10
        pay = 2
      when 5, 9
        pay = 3/2.to_f
      else
        pay = 6/5.to_f
      end
      @payouts = { point => pay }
    end
  end

  def payout_on_roll(roll)

    if win?(roll)
      @resolved = true
      pay_amount = ( @amount * (1 + @payouts[ roll[0] + roll[1] ] ) ).floor
      puts "You win your #{@name} bet of $#{@amount} getting $#{ pay_amount }"
    elsif lose?(roll)
      @resolved = true
      pay_amount = 0
      puts "You lose your #{@name} bet of $#{@amount}"
    else
      pay_amount = 0
    end

    pay_amount
  end

  def payout_on_take_down
    @resolved = true
    @amount
  end

  private

  def win?(roll)
    @winning_rolls.include?(roll[0] + roll[1]) || @winning_rolls.include?(roll) || @winning_rolls.include?(roll.rotate)
  end

  def lose?(roll)
    @losing_rolls.include?(roll[0] + roll[1]) || @losing_rolls.include?(roll) || @losing_rolls.include?(roll.rotate)
  end
end